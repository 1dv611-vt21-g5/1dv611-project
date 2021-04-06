'use strict';

const router = require('express').Router();
const controller = require('./controller');

router.post('/', controller.notification);

module.exports = router;
