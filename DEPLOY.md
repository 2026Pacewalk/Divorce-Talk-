# Deploying DivorceTalk.in

Target: **Ubuntu 22.04 / 24.04 VPS**, bare-metal Node + PM2 + nginx + MySQL on the same box, Let's Encrypt SSL.

You should already have:
- SSH root access to the VPS
- A domain with an `A` record pointing to the VPS IPv4
- This repo on your local machine

The whole thing takes ~10 minutes the first time.

---

## 1. Bootstrap the VPS (one-time)

Upload `deploy/setup-vps.sh` to the VPS, then run it as root.

From your **local** machine:

```bash
scp deploy/setup-vps.sh root@YOUR_VPS_IP:/root/
```

From the **VPS** (you're already SSH'd in as root):

```bash
bash /root/setup-vps.sh
```

This will:
- Update apt and install nginx, MySQL 8, certbot, build tools, git, ufw
- Install Node 22 + PM2
- Create the `divorcetalk` system user with home `/home/divorcetalk`
- Create `/var/www/divorcetalk` (app dir) and `/var/log/divorcetalk` (PM2 logs)
- Enable the firewall and allow ports 22, 80, 443
- Lock down the default MySQL install (drops test db, anonymous users)

It prints a checklist at the end mirroring the steps below.

---

## 2. Create the database

On the **VPS**, still as root:

```bash
sudo mysql <<'SQL'
CREATE DATABASE divorcetalk CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'divorcetalk'@'localhost' IDENTIFIED BY 'CHANGE_ME_STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON divorcetalk.* TO 'divorcetalk'@'localhost';
FLUSH PRIVILEGES;
SQL
```

Pick a strong password — you'll paste it into `.env` next.

---

## 3. Upload the code

Easiest: **rsync** from your local machine.

```bash
# From your LOCAL machine, in the repo root:
rsync -avz --delete \
  --exclude node_modules --exclude dist --exclude .git \
  --exclude .env --exclude .dev.log --exclude .prod.log \
  ./ root@YOUR_VPS_IP:/var/www/divorcetalk/
```

Then on the **VPS** as root:

```bash
chown -R divorcetalk:divorcetalk /var/www/divorcetalk
```

Alternative: `git clone` directly on the VPS if your repo is hosted somewhere.

---

## 4. Build and start the app

Switch to the app user:

```bash
sudo -u divorcetalk -i
cd /var/www/divorcetalk
```

Install deps and configure env:

```bash
npm ci
cp deploy/.env.production.example .env
nano .env
```

Fill in:
- `APP_SECRET` — generate with `openssl rand -base64 64`
- `DATABASE_URL` — `mysql://divorcetalk:YOUR_PASSWORD@127.0.0.1:3306/divorcetalk`

Build, create tables, seed demo data:

```bash
npm run build
npx drizzle-kit push      # creates the tables from schema.ts
npx tsx db/seed.ts        # seeds the 4 named demo accounts + content
```

Start with PM2:

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 status
```

You should see `divorcetalk` running on port 3000. Test it locally:

```bash
curl -s http://127.0.0.1:3000/api/trpc/ping
# → [{"result":{"data":{"json":{"ok":true,"ts":...}}}}]
```

Exit back to root:

```bash
exit
```

---

## 5. Make PM2 start on boot

Still on the **VPS** as root:

```bash
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u divorcetalk --hp /home/divorcetalk
```

PM2 prints a `systemctl enable …` command — paste it back and run it.

---

## 6. Configure nginx

```bash
cp /var/www/divorcetalk/deploy/nginx.conf /etc/nginx/sites-available/divorcetalk.in
# Replace `divorcetalk.in` placeholders with your actual domain
sed -i 's/divorcetalk\.in/YOUR_DOMAIN/g' /etc/nginx/sites-available/divorcetalk.in
ln -sf /etc/nginx/sites-available/divorcetalk.in /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

Visit `http://YOUR_DOMAIN/` — the site should load over plain HTTP.

---

## 7. SSL with Let's Encrypt

```bash
certbot --nginx \
  -d YOUR_DOMAIN -d www.YOUR_DOMAIN \
  --redirect --agree-tos --email you@YOUR_DOMAIN
```

Certbot installs the cert, rewrites the nginx config to redirect HTTP → HTTPS, and adds itself to a renewal cron job.

Verify:

```bash
curl -I https://YOUR_DOMAIN/
# → HTTP/2 200
```

---

## 8. Verify everything works

| Check | Command |
|---|---|
| App reachable | `curl -I https://YOUR_DOMAIN/` |
| tRPC alive | `curl https://YOUR_DOMAIN/api/trpc/ping` |
| PM2 healthy | `pm2 status` |
| PM2 logs | `pm2 logs divorcetalk --lines 30` |
| Nginx logs | `tail -f /var/log/nginx/access.log` |
| MySQL up | `systemctl status mysql` |
| Test demo login | Open `https://YOUR_DOMAIN/login` → click any demo account |

The 4 named demo accounts are seeded in the DB so the local-auth login form also accepts them:

| Email | Password | Role |
|---|---|---|
| `demo@divorcetalk.in` | `Demo@123` | user |
| `listener@divorcetalk.in` | `Demo@123` | moderator + listener |
| `moderator@divorcetalk.in` | `Demo@123` | moderator |
| `admin@divorcetalk.in` | `Admin@123` | admin |

---

## Future deploys

After the first deploy, updating is one command. Push code to the VPS (`rsync` or `git pull`), then on the VPS as the app user:

```bash
sudo -u divorcetalk -i
cd /var/www/divorcetalk
bash deploy/deploy.sh           # build + reload
# or:
bash deploy/deploy.sh --migrate # if you changed the DB schema
```

`deploy.sh` runs `npm ci`, optionally pushes schema, builds, and zero-downtime reloads PM2.

---

## Troubleshooting

**App won't start, PM2 says errored**
```bash
pm2 logs divorcetalk --err --lines 50
```
Almost always one of: missing `.env`, wrong `DATABASE_URL`, or `npm run build` wasn't run.

**502 Bad Gateway from nginx**
The Node app isn't listening on 3000. `pm2 status` to see; `pm2 restart divorcetalk` if errored.

**Database errors**
```bash
mysql -u divorcetalk -p divorcetalk -e "SELECT 1"
```
If that fails, your `DATABASE_URL` password or db name is wrong.

**Certbot says domain isn't reachable**
DNS hasn't propagated yet. `dig YOUR_DOMAIN` should return your VPS IP. Wait, then retry.

**File permission errors after rsync**
```bash
sudo chown -R divorcetalk:divorcetalk /var/www/divorcetalk
```

**Nginx config test fails**
```bash
nginx -t
```
Read the line + column it points to — usually a stray character from `sed`.

---

## What's deployed

- **Frontend**: React 19 + Vite SPA, served from `/var/www/divorcetalk/dist/public/`
- **Backend**: Hono + tRPC bundled to `/var/www/divorcetalk/dist/boot.js`, listens on `127.0.0.1:3000`
- **Database**: MySQL 8 on `127.0.0.1:3306` (only listens on localhost)
- **Reverse proxy**: nginx on `:80` and `:443` proxying to `127.0.0.1:3000`, terminating SSL, gzipping, caching `/assets/*` aggressively, `/sw.js` not at all
- **Process supervisor**: PM2 (auto-restarts, 512MB memory cap, logs to `/var/log/divorcetalk/`)
- **SSL**: Let's Encrypt with auto-renewal via certbot's systemd timer
- **Firewall**: ufw allowing only 22, 80, 443
