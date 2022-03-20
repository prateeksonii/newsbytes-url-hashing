const express = require('express');
const { createURLHash, getAllHashes } = require('../controllers/hashControllers');

const router = express.Router();

router.route('/').get(getAllHashes).post(createURLHash);

module.exports = router;
