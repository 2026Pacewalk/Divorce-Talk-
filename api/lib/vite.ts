import type { Hono } from "hono";
import type { HttpBindings } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "fs";
import path from "path";
import { injectMeta } from "./seo";

type App = Hono<{ Bindings: HttpBindings }>;

export function serveStaticFiles(app: App) {
  const distPath = path.resolve(import.meta.dirname, "../dist/public");
  const indexPath = path.resolve(distPath, "index.html");

  // Read the shell once at boot and keep it warm in memory. We re-inject
  // per-route meta on every request — that's the cheap part.
  const indexShell = fs.readFileSync(indexPath, "utf-8");

  app.use("*", serveStatic({ root: "./dist/public" }));

  app.notFound((c) => {
    const accept = c.req.header("accept") ?? "";
    if (!accept.includes("text/html")) {
      return c.json({ error: "Not Found" }, 404);
    }
    const url = new URL(c.req.url);
    const html = injectMeta(indexShell, url.pathname);
    return c.html(html);
  });
}
