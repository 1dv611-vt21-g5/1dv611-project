/**   
* Main router.
*
* @author 
* @version 1.0.0
*/

const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const authenticate = require('../controllers/authenticate')
const getIotNodes = require('../controllers/getIotNodes')

// Login
router.post('/auth', authenticate)

// Get iot nodes
router.get('/iotnodes', getIotNodes)

// Catch 404
router.use('*', (req, res, next) => next(createError(404)))

// Exports
module.exports = router