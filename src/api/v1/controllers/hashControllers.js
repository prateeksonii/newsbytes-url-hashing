const { nanoid } = require('nanoid');
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

    const newHash = new URLHash({
      originalUrl,
      hash: nanoid(),
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

exports.editURLHash = async (req, res, next) => {
  try {
    const { url, hash } = req.body;

    const { hash: originalHash } = req.params;

    if (!originalHash) {
      res.status(400);
      throw new Error('No hash provided');
    }

    if (!url && !hash) {
      res.status(400);
      throw new Error('No field provided to update');
    }

    const existingHash = await URLHash.findOne({
      hash: originalHash,
    });

    if (!existingHash) {
      res.status(404);
      throw new Error('Hash not found');
    }

    if (url) {
      existingHash.originalUrl = url;
    }

    if (hash) {
      existingHash.hash = hash;
    }

    await existingHash.save();

    return res.status(200).json({
      ok: true,
      data: {
        hash: existingHash,
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

    const existingHash = await URLHash.findOne({
      hash,
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
