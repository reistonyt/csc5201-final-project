

const pool = require('../utils/db'); // Database pool
const axios = require('axios'); // HTTP client for external requests

const postLogin = async (req, res) => {
    return res.json({ message: 'Login successful' });
};

module.exports = { postLogin };