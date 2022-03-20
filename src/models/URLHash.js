const mongoose = require('mongoose');

const urlHashSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: [true, 'Original URL is required'],
    validate: {
      validator: (value) => /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi.test(value),
      message: 'Invalid URL value',
    },
    unique: [true, 'Original URL already exists'],
  },
  hashedUrl: {
    type: String,
    required: [true, 'Original URL is required'],
    validate: {
      validator: (value) => /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi.test(value),
      message: 'Invalid URL value',
    },
    unique: [true, 'Original URL already exists'],
  },
  clicks: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('urlHash', urlHashSchema);
