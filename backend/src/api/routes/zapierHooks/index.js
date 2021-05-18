'use strict'

const router = require('express').Router()
const controller = require('./controller')

router.post('/', controller.createZapierHook)
router.delete('/', controller.deleteZapierHook)
router.get('/devices', controller.getUserSubscriptions)
router.get('/device', controller.generateSampleData)

// Exports.
module.exports = router
