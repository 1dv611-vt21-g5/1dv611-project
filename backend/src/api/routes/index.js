'use strict';

const router = require('express').Router();
const auth = require('../middleware/auth');

const authController = require('./auth');
const devices = require('./devices');
const notifications = require('./notifications');
const subscriptions = require('./subscriptions');

router.use('/auth', authController);
router.use('/devices', auth.isUserAuthenticated, devices);
router.use('/notifications', notifications);
router.use('/subscriptions', auth.isUserAuthenticated, subscriptions);

module.exports = router;
