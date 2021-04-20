'use strict'

const router = require('express').Router()
const controller = require('./controller')

router.get('/', controller.getZapierHooks)
router.post('/', controller.createZapierHook)
router.get('/:id', controller.getZapierHook)
router.put('/:id', controller.editZapierHook)
router.delete('/:id', controller.deleteZapierHook)

module.exports = router
