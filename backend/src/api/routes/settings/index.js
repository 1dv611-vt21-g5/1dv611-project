'use strict'

const router = require('express').Router()
const controller = require('./controller')

router.get('/', controller.getSettings)
router.post('/', controller.addSetting)
router.get('/:id', controller.getSetting)
router.put('/:id', controller.editSetting)
router.delete('/:id', controller.deleteSetting)

module.exports = router
