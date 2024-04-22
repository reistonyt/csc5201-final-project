// server.js
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Custom Express backend logic
  server.get('/api/custom', (req, res) => {
    res.status(200).json({ message: 'Custom Express endpoint' });
  });

  // Let Next.js handle the React-based pages
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log(`Server running on http://localhost:3000`);
  });
});
d