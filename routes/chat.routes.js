const express = require('express');
const router = express.Router();

// Exemple route chat
router.get('/', (req, res) => {
    res.send('Chat route works!');
});

module.exports = router;
