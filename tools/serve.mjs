// Dependency-free static server for local preview and the UI conformance
// suite. It serves the repository root the way GitHub Pages publishes it:
// a missing path answers HTTP 404 with the site's own 404.html, so a broken
// internal link is observable as a real 404 rather than a silent fallback.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";

const root = resolve(process.argv[2] ?? process.env.SERVE_ROOT ?? ".");
const port = Number(process.env.PORT ?? 4173);
const types = Object.freeze({
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".txt": "text/plain; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".ico": "image/x-icon", ".md": "text/markdown; charset=utf-8"
});

const resolvePath = async url => {
  const path = decodeURIComponent(new URL(url, "http://localhost").pathname);
  const target = normalize(join(root, path));
  if (target !== root && !target.startsWith(root + sep)) return null;
  const info = await stat(target).catch(() => null);
  if (info?.isDirectory()) return join(target, "index.html");
  return info?.isFile() ? target : null;
};

const respond = (response, status, type, body, method) => {
  response.writeHead(status, { "content-type": type });
  response.end(method === "HEAD" ? undefined : body);
};

createServer(async (request, response) => {
  const method = request.method ?? "GET";
  if (method !== "GET" && method !== "HEAD") {
    // GitHub Pages is static: it rejects form posts the same way.
    respond(response, 405, "text/plain; charset=utf-8", "Method not allowed", method);
    return;
  }
  const file = await resolvePath(request.url ?? "/");
  const body = file ? await readFile(file).catch(() => null) : null;
  if (body) {
    respond(response, 200, types[extname(file)] ?? "application/octet-stream", body, method);
    return;
  }
  const notFound = await readFile(join(root, "404.html")).catch(() => "Not found");
  respond(response, 404, "text/html; charset=utf-8", notFound, method);
}).listen(port, "127.0.0.1", () => console.log(`Serving ${root} at http://127.0.0.1:${port}/`));
