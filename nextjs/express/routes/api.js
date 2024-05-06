const express = require('express');
const router = express.Router();

// Import news router
const newsRouter = require('./news');
router.use('/news', newsRouter);

// Import usage statistics router
const admin = require('./admin');
router.use('/admin', admin);

// Import login router
const login = require('./login');
router.use('/login', login);

module.exports = router;
