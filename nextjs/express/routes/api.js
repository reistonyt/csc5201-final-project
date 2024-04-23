const express = require('express');
const router = express.Router();

// Import news router
const newsRouter = require('./news');
router.use('/news', newsRouter);

module.exports = router;
