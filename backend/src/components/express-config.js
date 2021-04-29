'use strict'

const session = require('express-session')
const MongoStore = require('connect-mongo')

const mongoose = require('./mongoose')
const config = require('../config')
const common = require('../config/common')

const apply = app => {
  // set up the session, required by OAuth2 framework
  // uncomment FileStore to and its associated sessionConfig if you
  // want to store the sessionStore visit https://www.npmjs.com/package/express-session
  // to see other supported data stores

  const sessionConfig = config.session
  const sessionMiddleware = session({
    ...sessionConfig,
    store: MongoStore.create({
      mongoUrl: common.DB_CONNECTION_STRING
    })
  })

  // Logging for requests
  const morgan = require('morgan')
  app.use(morgan('dev'))

  // Enable cross origin requests, XXX WARNING! must be added before other routes
  const cors = require('cors')
  app.options('*', cors(config.cors))
  app.use(cors(config.cors))

  // Apply routes
  app.use('/api', sessionMiddleware, require('../api'))

  // Apply error handlers
  app.use((req, res, next) => {
    res.sendStatus(404)
  })
  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err)
    }
    console.warn('Error handler, error message:', err.message)
    res.status(err.status || err.statusCode || 500).send({
      message: err.message
    })
  })
}

// Exports.
module.exports = {
  apply
}
