const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // apiRouter
  const apiRouter = require('./routes/api');
  server.use('/api', apiRouter);

  // Handle Next.js requests
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log(`Server running on http://localhost:3000`);
  });
});
