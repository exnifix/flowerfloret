// Restore the complete website by setting this to false and publishing changes.
export const SITE_OFFLINE = true;

export function offlineResponse(): Response {
  return new Response(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>404 — Hosting not found</title>
  <style>
    :root{color-scheme:light;--background:#fff;--foreground:#000;--border:#ccc}
    *{box-sizing:border-box}
    body{margin:0;padding:32px 20px;background:var(--background);color:var(--foreground);font-family:"Times New Roman",Times,serif;text-align:center}
    main{max-width:640px;margin:0 auto}
    h1{font-size:32px;margin:0 0 20px;font-weight:700}
    hr{border:0;border-top:1px solid var(--border);margin:0}
    p{font-size:16px;line-height:1.5;margin:18px 0 0}
  </style>
</head>
<body><main><h1>404</h1><hr><p>Hosting not found</p></main></body>
</html>`, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}