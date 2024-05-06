const pool = require('../utils/db'); // Database pool
const axios = require('axios'); // HTTP client for external requests

const getUsage = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM metrics'
        ); // SQL query to fetch usage statistics
        res.status(200).json(result.rows); // Return the results
    } catch (err) {
        console.error('Error fetching usage statistics:', err);
        res.status(500).json({ error: 'Error fetching usage statistics' });
    }
};

module.exports = { getUsage };
