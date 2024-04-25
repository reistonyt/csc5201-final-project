const pool = require('../utils/db'); // Database pool
const axios = require('axios'); // HTTP client for external requests
const { url } = require('inspector');

const getNews = async (req, res) => {
  let page = parseInt(req.query.page);
  if (isNaN(page) || page < 1) {
    res.status(400).json({ error: 'Invalid page number' });
  }

  const limit = 20; // Number of records per page
  const offset = (page - 1) * limit; // Offset based on page number

  try {
    const result = await pool.query(
      'SELECT * FROM articles LIMIT $1 OFFSET $2', 
      [limit, offset]
    ); // SQL query with parameterized values
    res.status(200).json({
      articles: result.rows,
      page,
      records: result.rowCount,
    }); // Return the results with pagination info
  } catch (err) {
    console.error('Error fetching news from database:', err);
    res.status(500).json({ error: 'Error fetching news from database' });
  }
};

// const getNewsSummary = async (req, res) => {
//   try {
//     const result = await axios.get('http://flask:5000/api/news/summary', {
//       params: { url: req.query.url },
//     }); // GET request to Flask API with URL parameter
//     res.status(200).json(result.data); // Return Flask data
//   } catch (err) {
//     console.error('Error fetching news summary:', err);
//     res.status(500).json({ error: 'Error fetching news summary' });
//   }
// };

const getNewsSummary = async (req, res) => {
  try {
    const response = await axios.get('http://flask:5000/api/news/summary', {
      params: { url: req.query.url },
      responseType: 'stream', // Stream response data
    });

    response.data.on('data', (chunk) => {
      res.write(chunk); // Write data chunks to Express response
    });

    response.data.on('end', () => {
      res.end(); // End response stream
    });
  } catch (err) {
    console.error('Error fetching news summary:', err);
    res.status(500).json({ error: 'Error fetching news summary' });
  }
};

module.exports = { getNews, getNewsSummary };
