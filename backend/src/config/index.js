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
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    name: 'ysocial_sess',
    cookie: {
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
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
      info: 'Yggio integration for connecting to Zapier',
      redirectUris: {
        browser: `${process.env.FRONTEND_URI}/oauth`,
        app: 'your-app://login' // should be changed, if used
      },
      logoPath: path.join(__dirname, '../../asset/your-company-logo.png')
    }
  }
}
