const express = require('express');
const {
  createURLHash, getAllHashes, editURLHash, getHash, deleteURLHash,
} = require('../controllers/hashControllers');

const router = express.Router();

router.route('/').get(getAllHashes).post(createURLHash);
router.route('/:hash').get(getHash).put(editURLHash).delete(deleteURLHash);

module.exports = router;
