const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Page du chat
router.get('/', authMiddleware, (req, res) => {
    res.render('chat');
});

// Autres routes et logique de chat, par exemple pour gérer les messages

module.exports = router;
