const express = require('express');
const { createURLHash } = require('../controllers');

const router = express.Router();

router.post('/hash', createURLHash);

module.exports = router;
