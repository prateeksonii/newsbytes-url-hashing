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
