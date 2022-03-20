const express = require('express');
const hashRouter = require('./hashRouter');
const authRouter = require('./authRouter');
const { isAuthenticated } = require('../controllers/authControllers');

const router = express.Router();

router.use('/hash', isAuthenticated, hashRouter);
router.use('/auth', authRouter);

module.exports = router;
