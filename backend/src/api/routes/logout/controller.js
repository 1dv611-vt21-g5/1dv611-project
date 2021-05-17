'use strict'

const logout = (req, res, next) => {
  req.session.destroy()
}

// Exports.
module.exports = { logout }
