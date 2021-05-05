'use strict'

const router = require('express').Router()
const auth = require('../middleware/auth')
const authController = require('./auth')
const devices = require('./devices')
const notifications = require('./notifications')
const settings = require('./settings')
const subscriptions = require('./subscriptions')
const zapierHooks = require('./zapierHooks')
const updates = require('./updates')
const logout = require('./logout')

router.use('/auth', authController)
router.use('/devices', auth.isUserAuthenticated, devices)
router.use('/notifications', notifications)
router.use('/settings', auth.isUserAuthenticated, settings)
router.use('/subscriptions', auth.isUserAuthenticated, subscriptions)
router.use('/zapier', auth.hasValidApiKey, zapierHooks)
router.use('/updates', updates)
router.use('/logout', logout)

// Exports.
module.exports = router
