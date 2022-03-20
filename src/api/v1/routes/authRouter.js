const express = require('express');
const { login, checkAuthStatus } = require('../controllers/authControllers');

const router = express.Router();

router.route('/').get(checkAuthStatus).post(login);

module.exports = router;
