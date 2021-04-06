'use strict';

const router = require('express').Router();
const controller = require('./controller');

router.get('/', controller.fetch);

module.exports = router;
