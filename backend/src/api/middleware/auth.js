'use strict'

const User = require('../../models/User')

const isUserAuthenticated = (req, res, next) => {
  console.log(req.session.user)
  if (req.session.user) {
    return next()
  }

  return next({
    status: 401,
    message: 'No session.'
  })
}

const hasValidApiKey = async (req, res, next) => {
  try {
    const { userApiKey } = req.body

    const hasValidApiKey = await User.exists({ api_key_zapier: userApiKey })

    if (hasValidApiKey) {
      return next()
    } else {
      res.status(401).send({ message: 'Invalid API Key.' })
    }
  } catch (e) {
    console.log(e)
    res.status(401).send({ message: 'No API Key provided.' })
  }
}

// Exports.
module.exports = {
  isUserAuthenticated,
  hasValidApiKey
}
