const pool = require('../utils/db'); // Database pool
const axios = require('axios'); // HTTP client for external requests

const getNews = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 0; // Ensure `page` is a number
  const limit = 20; // Define the limit for pagination
  const offset = page * limit;

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

const getNewsSummary = async (req, res) => {
  try {
    const result = await axios.get('http://flask:5000/api/news/summary'); // Fetch news summary from Flask
    res.status(200).json(result.data); // Return Flask data
  } catch (err) {
    console.error('Error fetching news summary:', err);
    res.status(500).json({ error: 'Error fetching news summary' });
  }
};

module.exports = { getNews, getNewsSummary };
