const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { ErrorResponseObject } = require('./common/http');

process.env.ANCHOR_WALLET = __dirname + '/wallet.json';

const routes = require('./routes');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.json({ limit: '50mb' }));
//app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(helmet());
app.use('/', routes);

// default catch all handler
app.all('*', (req, res) => res.status(404).json(new ErrorResponseObject('route not defined')));

module.exports = app;
