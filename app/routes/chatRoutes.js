const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.use('/', chatController);

module.exports = router;
