'use strict';

const router = require('express').Router();
const controller = require('./controller');

router.get('/info', controller.info);
router.get('/code', controller.code);

module.exports = router;
