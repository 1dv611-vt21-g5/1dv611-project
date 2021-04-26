'use strict'

const router = require('express').Router()
const controller = require('./controller')

router.post('/', controller.createZapierHook)
router.delete('/', controller.deleteZapierHook)

module.exports = router
