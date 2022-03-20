const mongoose = require('mongoose');

const urlHashSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: [true, 'Original URL is required'],
    validate: {
      validator: (value) => /^https?:\/\/\w+(\.\w+)*(:[0-9]+)?(\/.*)?$/.test(value),
      message: 'Invalid URL value',
    },
    unique: [true, 'Original URL already exists'],
  },
  hash: {
    type: String,
    required: [true, 'Hash is required'],
    unique: [true, 'Hash already exists'],
  },
  clicks: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('urlHash', urlHashSchema);
