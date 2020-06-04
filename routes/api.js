const express = require('express');

const router = express.Router();
// création des routes
router.post('/api', controller);
router.get('/api', controller);

module.exports = router;