'use strict'

const common = require('../../../config/common')

const logout = (req, res, next) => { 
  res.redirect(common.FRONTEND_URL + ':' + common.FRONTEND_PORT)
}

// Exports.
module.exports = { logout }
