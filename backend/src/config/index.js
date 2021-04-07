'use strict'

const path = require('path')
const common = require('./common')

module.exports = {
  cors: {
    credentials: true,
    origin: true
  },
  express: {
    host: common.BACKEND_HOST,
    port: common.BACKEND_PORT
  },
  session: {
    path: path.normalize(path.join(__dirname, '../sessions')),
    secret: 'random-secret-session-key',
    saveUninitialized: true,
    resave: true,
    name: 'your_session_name',
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 30 // one month
    }
  },
  subscription: {
    http: {
      url: `http://${common.BACKEND_HOST}:${common.BACKEND_PORT}/api/notifications`
    }
  },
  yggio: {
    url: common.YGGIO_API_URL,
    account: {
      username: common.YGGIO_ACCOUNT_USERNAME,
      password: common.YGGIO_ACCOUNT_PASSWORD
    },
    provider: {
      name: common.PROVIDER_NAME,
      info: 'Created by yggio-service-example',
      redirectUris: {
        browser: `${common.FRONTEND_URL}:${common.FRONTEND_PORT}/oauth`,
        app: 'your-app://login' // should be changed, if used
      },
      logoPath: path.join(__dirname, '../../asset/your-company-logo.png')
    }
  }
}
