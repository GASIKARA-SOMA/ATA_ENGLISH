const express = require('express');
const router = express.Router();

// Exemple route fichiers
router.get('/', (req, res) => {
    res.send('Files route works!');
});

module.exports = router;
