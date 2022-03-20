const { v4 } = require('uuid');
const URLHash = require('../models/URLHash');

exports.createURLHash = async (req, res, next) => {
  try {
    const { url: originalUrl } = req.body;

    if (!originalUrl) {
      res.status(400);
      throw new Error('No URL provided to hash');
    }

    const existingHash = await URLHash.findOne({
      originalUrl,
    });

    if (existingHash) {
      res.status(409);
      throw new Error('Original URL provided already exists');
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const hashedUrl = `${baseUrl}/h/${v4()}`;

    const newHash = new URLHash({
      originalUrl,
      hashedUrl,
    });

    await newHash.save();

    return res.status(201).json({
      ok: true,
      data: {
        hash: newHash,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.getOriginalUrl = async (req, res, next) => {
  try {
    const { hash } = req.params;

    if (!hash) {
      res.status(400);
      throw new Error('No hash provided');
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const hashedUrl = `${baseUrl}/h/${hash}`;

    const existingHash = await URLHash.findOne({
      hashedUrl,
    });

    if (!existingHash) {
      res.status(404);
      throw new Error('No original URL present for this hash');
    }

    existingHash.clicks += 1;

    await existingHash.save();

    return res.redirect(existingHash.originalUrl);
  } catch (err) {
    return next(err);
  }
};

exports.getAllHashes = async (req, res, next) => {
  try {
    const hashes = await URLHash.find();

    return res.status(200).json({
      ok: true,
      data: {
        hashes,
      },
    });
  } catch (err) {
    return next(err);
  }
};
