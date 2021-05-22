'use strict'

const User = require('../../models/User')

const isUserAuthenticated = (req, res, next) => {
  // TODO: Detta lades till för att kunna skippa den här kollen i supertest-tester
  if (req.session.user || process.env.NODE_ENV === 'test') {
    return next()
  }

  return next({
    status: 401,
    message: 'No session.'
  })
}

const hasValidApiKey = async (req, res, next) => {
  try {
    const userApiKey = req.query.key || req.query.api_key ||
      req.header('X-API-KEY') ||
      req.body.userApiKey ||
      req.query.userApiKey

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
