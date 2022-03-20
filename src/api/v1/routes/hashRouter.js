const express = require('express');
const { createURLHash, getAllHashes, editURLHash } = require('../controllers/hashControllers');

const router = express.Router();

router.route('/').get(getAllHashes).post(createURLHash);
router.put('/:hash', editURLHash);

module.exports = router;
