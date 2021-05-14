'use strict'

const logout = (req, res, next) => {
  req.session.destroy()
  res.redirect(process.env.FRONTEND_URL + ':' + process.env.FRONTEND_PORT)
}

// Exports.
module.exports = { logout }
