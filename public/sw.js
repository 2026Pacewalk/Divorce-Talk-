// DivorceTalk.in service worker
// Tiny, intentionally simple: caches the app shell + key static assets,
// serves them when offline, and never gets in the way of /api/* or dev HMR.
// Bump VERSION on any deploy to roll out updates — clients see the toast.

const VERSION = "dt-v2";
const SHELL_CACHE = `${VERSION}-shell`;
const RUNTIME_CACHE = `${VERSION}-runtime`;

const SHELL = [
  "/",
  "/manifest.webmanifest",
  "/hero-bg.jpg",
  "/emotional-gradient.jpg",
];

const OFFLINE_HTML = `<!doctype html>
<html lang="en"><head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>You're offline — DivorceTalk.in</title>
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center;
           font-family: 'Inter', system-ui, sans-serif;
           background: linear-gradient(135deg,#F7F1E8,#F0D9CF 55%,#E0E5DC);
           color: #2E2A28; padding: 32px; }
    .card { max-width: 460px; text-align: center; background: rgba(255,253,249,0.9);
            backdrop-filter: blur(16px); border: 1px solid #E8E2D9; border-radius: 28px;
            padding: 40px 28px; box-shadow: 0 20px 60px rgba(46,42,40,0.12); }
    h1 { font-family: 'DM Serif Display', Georgia, serif; font-size: 28px;
         line-height: 1.1; margin: 0 0 12px; }
    p { color: #6B6562; font-size: 14.5px; line-height: 1.6; margin: 0; }
    .dot { display: inline-block; width: 8px; height: 8px; border-radius: 999px;
           background: #C88F7A; margin-right: 8px; vertical-align: middle; }
    a { color: #C88F7A; text-decoration: none; font-weight: 600; }
  </style>
</head><body>
  <div class="card">
    <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color:#9B9590; margin-bottom: 10px;">
      <span class="dot"></span>You're offline
    </p>
    <h1>The connection slipped away.</h1>
    <p>Don't worry — your journal stays safe on your device.<br/>
       When you're back online, <a href="/">tap here</a> and we'll pick up where you were.</p>
  </div>
</body></html>`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL).catch(() => {}))
  );
  // Don't auto-skip — let the client decide via SKIP_WAITING message so we
  // can show the "new version available — refresh?" toast first.
});

// Allow the page to ask us to activate immediately.
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k !== SHELL_CACHE && k !== RUNTIME_CACHE)
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Never intercept API, tRPC, websockets, or Vite dev/HMR endpoints.
  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/@vite/") ||
    url.pathname.startsWith("/@react-refresh") ||
    url.pathname.startsWith("/__inspect") ||
    url.pathname.startsWith("/node_modules/") ||
    url.pathname.includes("hot-update") ||
    url.pathname.startsWith("/src/")
  ) {
    return;
  }

  // Navigation requests → network first, fall back to cache, then offline page.
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put("/", fresh.clone()).catch(() => {});
          return fresh;
        } catch {
          const cached = await caches.match("/");
          if (cached) return cached;
          return new Response(OFFLINE_HTML, {
            headers: { "content-type": "text/html; charset=utf-8" },
            status: 200,
          });
        }
      })()
    );
    return;
  }

  // Static assets (images, fonts, manifest, etc.) → stale-while-revalidate.
  event.respondWith(
    (async () => {
      const cache = await caches.open(RUNTIME_CACHE);
      const cached = await cache.match(req);
      const networkPromise = fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === "basic") {
            cache.put(req, res.clone()).catch(() => {});
          }
          return res;
        })
        .catch(() => null);
      return cached || (await networkPromise) || new Response("", { status: 504 });
    })()
  );
});
