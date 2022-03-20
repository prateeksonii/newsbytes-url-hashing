const express = require('express');
const hashRouter = require('./hashRouter');

const router = express.Router();

router.use('/hash', hashRouter);

module.exports = router;
