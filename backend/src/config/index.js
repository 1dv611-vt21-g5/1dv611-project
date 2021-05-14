'use strict'

const path = require('path')

// Exports.
module.exports = {
  cors: {
    credentials: true,
    origin: true
  },
  express: {
    host: process.env.BACKEND_HOST,
    port: process.env.BACKEND_PORT
  },
  session: {
    path: path.normalize(path.join(__dirname, '../sessions')),
    secret: 'random-secret-session-key', // TODO: fix
    saveUninitialized: true,
    resave: true,
    name: 'your_session_name', // TODO: fix
    cookie: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
      maxAge: 1000 * 60 * 60 * 24 * 30 // one month
    }
  },
  subscription: {
    http: {
      url: `http://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}/api/notifications`
    }
  },
  yggio: {
    url: process.env.YGGIO_API_URL,
    account: {
      username: process.env.YGGIO_ACCOUNT_USERNAME,
      password: process.env.YGGIO_ACCOUNT_PASSWORD
    },
    provider: {
      name: process.env.PROVIDER_NAME,
      info: 'Yggio integration for connecting to Zapier - Send your sensor data to Zapier and use it as a trigger for further actions',
      redirectUris: {
        browser: `${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/oauth`,
        app: 'your-app://login' // should be changed, if used
      },
      logoPath: path.join(__dirname, '../../asset/your-company-logo.png')
    }
  }
}
