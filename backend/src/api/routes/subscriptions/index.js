'use strict'

const router = require('express').Router()
const controller = require('./controller')

router.post('/', controller.subscribe)
router.delete('/', controller.unsubscribe)
router.get('/', controller.getSubscriptions)

// Exports.
module.exports = router
