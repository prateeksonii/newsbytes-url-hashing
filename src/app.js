const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { notFoundHandler, errorHandler } = require('./middlewares');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all('*', notFoundHandler);
app.use(errorHandler);

module.exports = app;
