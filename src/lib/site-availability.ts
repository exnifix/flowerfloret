// Restore the complete website by setting this to false and publishing changes.
export const SITE_OFFLINE = true;

export function offlineResponse(): Response {
  return new Response(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>404 — Floret</title><style>:root{--background:#080808;--foreground:#fafafa;--muted:#a3a3a3}*{box-sizing:border-box}body{margin:0;min-height:100svh;display:grid;place-items:center;background:var(--background);color:var(--foreground);font-family:ui-sans-serif,system-ui,sans-serif;text-align:center}h1{font-size:96px;font-weight:400;margin:0}p{color:var(--muted);margin:16px 0 0}</style></head><body><main><h1>404</h1><p>Page not found</p></main></body></html>`, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}