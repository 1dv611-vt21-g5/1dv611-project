'use strict'

const router = require('express').Router()
const controller = require('./controller')

router.get('/info', controller.info)
router.get('/code', controller.code)
router.get('/apikey', controller.testApiKey)

module.exports = router
