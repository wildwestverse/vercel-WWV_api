const { Router } = require('express');
const { SuccessResponseObject } = require('../common/http');
const demo = require('./demo.route');

const r = Router();

r.use('/api', demo);

r.get('/', (req, res) => res.json(new SuccessResponseObject('express vercel api')));

module.exports = r;
