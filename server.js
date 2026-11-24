// Minimal static server for Railway — no dependencies.
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'public');
const PORT = process.env.PORT || 3000;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
  let urlPath;
  try { urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname); }
  catch { res.writeHead(400); return res.end('Bad request'); }

  if (urlPath === '/health') { res.writeHead(200); return res.end('ok'); }
  if (urlPath === '/ua') { res.writeHead(301, { Location: '/ua/' }); return res.end(); }
  // EN used to live at /en/ — keep old links working.
  if (urlPath === '/en' || urlPath === '/en/' || urlPath === '/en/index.html') { res.writeHead(301, { Location: '/' }); return res.end(); }

  let file = path.normalize(path.join(ROOT, urlPath));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }
  if (urlPath.endsWith('/')) file = path.join(file, 'index.html');

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Not found');
    }
    const ext = path.extname(file);
    const headers = { 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Cache-Control': 'public, max-age=300' };
    if (ext === '.json') headers['Content-Disposition'] = 'attachment; filename="' + path.basename(file) + '"';
    res.writeHead(200, headers);
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', () => console.log(`Docs running on port ${PORT}`));
