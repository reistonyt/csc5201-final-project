const express = require('express');
const next = require('next');
const apiRouter = require('./routes/api');
const updateHits = require('./middlewares/updateHits');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Set up middleware
  server.use(updateHits);

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
