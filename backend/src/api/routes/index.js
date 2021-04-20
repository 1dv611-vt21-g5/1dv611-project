'use strict'

const router = require('express').Router()
const auth = require('../middleware/auth')

const authController = require('./auth')
const devices = require('./devices')
const notifications = require('./notifications')
const settings = require('./settings')
const subscriptions = require('./subscriptions')
const zapierHooks = require('./zapierHooks')

router.use('/auth', authController)
router.use('/devices', auth.isUserAuthenticated, devices)
router.use('/notifications', notifications)
router.use('/settings',auth.isUserAuthenticated, settings)
router.use('/subscriptions', auth.isUserAuthenticated, subscriptions)
router.use('/zapier', auth.isUserAuthenticated, zapierHooks) // TODO: This should be restricted by API key i think?? 

module.exports = router
