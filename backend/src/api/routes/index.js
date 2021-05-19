'use strict'

const router = require('express').Router()
const auth = require('../middleware/auth')
const authController = require('./auth')
const devices = require('./devices')
const subscriptions = require('./subscriptions')
const zapierHooks = require('./zapierHooks')
const updates = require('./updates')
const user = require('./user')

router.use('/auth', authController)
router.use('/devices', auth.isUserAuthenticated, devices)
router.use('/subscriptions', auth.isUserAuthenticated, subscriptions)
router.use('/zapier', auth.hasValidApiKey, zapierHooks)
router.use('/updates', updates)
router.use('/user', auth.isUserAuthenticated, user)

// Exports.
module.exports = router
