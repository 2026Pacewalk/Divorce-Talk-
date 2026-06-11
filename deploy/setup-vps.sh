#!/usr/bin/env bash
#
# DivorceTalk.in — one-shot Ubuntu 22.04 / 24.04 bootstrap.
# Run this ONCE on a fresh VPS as root.
#
#   curl -fsSL https://your-host/setup-vps.sh | bash
# or scp it up and:
#   sudo bash setup-vps.sh
#
# After it finishes, follow DEPLOY.md to push the app code.

set -euo pipefail

APP_USER="${APP_USER:-divorcetalk}"
APP_DIR="${APP_DIR:-/var/www/divorcetalk}"
LOG_DIR="${LOG_DIR:-/var/log/divorcetalk}"
NODE_MAJOR="${NODE_MAJOR:-22}"

say() { printf "\n\033[1;36m▸ %s\033[0m\n" "$*"; }
ok()  { printf "\033[1;32m✓ %s\033[0m\n" "$*"; }

if [ "$(id -u)" -ne 0 ]; then
  echo "Run as root: sudo bash $0"
  exit 1
fi

say "Updating apt"
apt-get update -y
apt-get upgrade -y

say "Installing base packages"
apt-get install -y \
  curl ca-certificates gnupg lsb-release \
  build-essential git ufw \
  nginx \
  mysql-server \
  certbot python3-certbot-nginx

say "Installing Node.js ${NODE_MAJOR}.x"
if ! command -v node >/dev/null || ! node --version | grep -q "^v${NODE_MAJOR}"; then
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y nodejs
fi
ok "Node $(node --version)  npm $(npm --version)"

say "Installing PM2 globally"
npm install -g pm2

say "Creating app user and directories"
if ! id -u "$APP_USER" >/dev/null 2>&1; then
  useradd --system --create-home --shell /bin/bash "$APP_USER"
fi
mkdir -p "$APP_DIR" "$LOG_DIR"
chown -R "$APP_USER:$APP_USER" "$APP_DIR" "$LOG_DIR"

say "Configuring firewall"
ufw allow OpenSSH
ufw allow 'Nginx Full'
yes | ufw enable || true

say "Securing MySQL (idempotent)"
# Enable MySQL service
systemctl enable --now mysql
# Auto-secure: drop test db, anon users, disallow remote root.
mysql --protocol=socket -u root <<'SQL'
DELETE FROM mysql.user WHERE User='';
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');
DROP DATABASE IF EXISTS test;
FLUSH PRIVILEGES;
SQL

cat <<EOF

──────────────────────────────────────────────────────────────
✓ VPS bootstrap complete.

Next steps (see DEPLOY.md for the full version):

1. Create the database + a dedicated MySQL user:

   sudo mysql <<'SQL'
   CREATE DATABASE divorcetalk CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'divorcetalk'@'localhost' IDENTIFIED BY 'CHANGE_ME_STRONG_PASSWORD';
   GRANT ALL PRIVILEGES ON divorcetalk.* TO 'divorcetalk'@'localhost';
   FLUSH PRIVILEGES;
   SQL

2. Upload code to ${APP_DIR}  (rsync / scp / git clone)
   Then  chown -R ${APP_USER}:${APP_USER} ${APP_DIR}

3. Build and start as the app user:
   sudo -u ${APP_USER} -i
   cd ${APP_DIR}
   npm ci
   cp deploy/.env.production.example .env
   nano .env                # fill in DATABASE_URL, APP_SECRET, etc.
   npm run build
   npx drizzle-kit push     # create tables
   npx tsx db/seed.ts       # seed demo accounts + content
   pm2 start ecosystem.config.cjs
   pm2 save
   exit

4. Make PM2 start on boot:
   sudo env PATH=\$PATH:/usr/bin pm2 startup systemd -u ${APP_USER} --hp /home/${APP_USER}
   (paste the command it prints back)

5. Configure nginx:
   sudo cp ${APP_DIR}/deploy/nginx.conf /etc/nginx/sites-available/divorcetalk.in
   sudo sed -i 's/divorcetalk\\.in/YOUR_DOMAIN/g' /etc/nginx/sites-available/divorcetalk.in
   sudo ln -sf /etc/nginx/sites-available/divorcetalk.in /etc/nginx/sites-enabled/
   sudo rm -f /etc/nginx/sites-enabled/default
   sudo nginx -t && sudo systemctl reload nginx

6. SSL with Let's Encrypt:
   sudo certbot --nginx -d YOUR_DOMAIN -d www.YOUR_DOMAIN \\
                --redirect --agree-tos --email you@YOUR_DOMAIN

App user:      ${APP_USER}
App dir:       ${APP_DIR}
Log dir:       ${LOG_DIR}
──────────────────────────────────────────────────────────────
EOF
