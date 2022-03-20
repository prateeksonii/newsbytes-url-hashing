/* eslint-disable no-console */
const mongoose = require('mongoose');

exports.connectDb = () => {
  mongoose.connect(process.env.DB_URI, (err) => {
    if (err) {
      return console.error('Error connecting to database', err);
    }

    return console.log('DB connected');
  });
};
