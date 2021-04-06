'use strict';

const router = require('express').Router();

const bodyParser = require('body-parser').json();
const routes = require('./routes');

router.use('/', bodyParser, routes);

module.exports = router;
