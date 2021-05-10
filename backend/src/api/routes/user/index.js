'use strict'

const router = require('express').Router()
const controller = require('./controller')

router.get('/', controller.getUser)
router.put('/', controller.resetApiKey)

// Exports.
module.exports = router
