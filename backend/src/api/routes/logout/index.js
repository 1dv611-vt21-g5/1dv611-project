'use strict'

const router = require('express').Router()
const controller = require('./controller')

router.get('/', controller.logout)

// Exports.
module.exports = router
