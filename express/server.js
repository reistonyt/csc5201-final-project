// server.js
const express = require('express');
const next = require('next');
const pool = require('./utils/db');
const { default: axios } = require('axios');

// const dev = process.env.NODE_ENV !== 'production';
const dev = false;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // ### Express handled routes ###
  server.get('/api/test', async (req, res) => {
    // Get page number from query string
    const page = req.query.page || 0;

    // Set limit and offset
    const limit = 20;
    const offset = page * limit;

    try {
      const result = await pool.query(`SELECT * FROM articles LIMIT $1 OFFSET $2`, [limit, offset]);
      res.status(200).json(result.rows);
    }
    catch (err) {
      console.error('Error fetching data from PostgreSQL:', err);
      res.status(500).json({ error: 'Error fetching data from PostgreSQL' });
    }
  });

  server.get('/api/custom', (req, res) => {
    res.status(200).json({ message: 'Custom Express endpoint' });
  });

  // ### Flask handled routes ###
  server.get('/api/news/summary', async (req, res) => {
    try {
      const result = await axios.get('http://flask:5000/api/news/summary');
      res.status(200).json(result.data);
    }
    catch (err) {
      console.error('Error fetching data from Flask:', err);
      res.status(500).json({ error: 'Error fetching data from Flask' });
    }
  });

  // ### Next.js routes ###
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log(`Server running on http://localhost:3000`);
  });
});
