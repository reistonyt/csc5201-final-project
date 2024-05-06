const express = require('express');
const router = express.Router();
const usageController = require('../controllers/usageController');

router.get('/statistics', usageController.getUsage);

module.exports = router;
