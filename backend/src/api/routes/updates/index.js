'use strict'

const router = require('express').Router()
const controller = require('./controller')

router.post('/:deviceId', controller.receiveData)

// Exports.
module.exports = router
