'use strict'

process.title = 'yggio-service-example'

const _ = require('lodash')
const yggioConnect = require('yggio-connect')

require('dotenv').config()

const config = require('./config')
const seedDb = require('../tools/seed-db')
const { resetUsers, saveProviderOauthSecret } = require('./components/db')

const { secret } = require('../db/oauth-info.json') // TODO: change this to use DB, see comment further down

const mongoose = require('./components/mongoose')

let server

// Setup exress
const initExpress = () => {
  console.log('Express HTTP server - starting...')
  const http = require('http')
  const app = require('express')()
  server = http.createServer(app)
  const expressConfig = require('./components/express-config')

  // Connect to the database
  mongoose.connect().catch(error => {
    console.error(error)
    process.exit(1)
  })

  expressConfig.apply(app)
  return new Promise(resolve => {
    server.listen(process.env.PORT || config.express.port, config.express.host, () => {
      console.log('Express HTTP server - ready')
      resolve()
    })
  })
}

// Registers and logs in the service provider, then registers the service.
// Registering the service grants the yggio-api access to protected
// requests for services such as OAuth and subscriptions.
// This function is idempotent.
const setup = async () => {
  console.log('### ### ### ### YGGIO API - setup...')

  // const { updateUser } = require('./components/db')
  const updateUser = formattedUser => {
    console.log('!!! This is config.yggio.refreshCallback, called with formattedUser: ', formattedUser)
  }
  config.yggio.refreshCallback = updateUser // TODO: is this why refreshTokens fail? it seems thsi function might be called when we want to use a refreshtoken, if this doesnt update the db its useless

  // TODO: IMPORTANT! Currently the OAuth secret is saved in a plain readable JSON file on first activation (../db/oauth-info.json), this is horrible
  // Ideally this should be a .env variable, but the way we acquire it currently makes this problematic (Heroku file systems are ephemeral, we would have to init our provider locally then save and add the secret manually)
  // a compromise could be to add a model for this code and save it to the DB - this would require initializing the mongoose connection earlier however.

  const result = await yggioConnect.init(config.yggio, secret)

  // Saves the OAuth secret
  saveProviderOauthSecret(result.provider.secret)

  console.log('### ### ### ### YGGIO API - ready')

  await seedDb.createExampleUsers()
  await seedDb.createExampleNodes()

  // // uncomment this code  to reset users when server starts
  // console.log('Resetting users...');
  // resetUsers();
  // console.log('Successfully reset users.');

  await initExpress()
}

const start = async () => {
  try {
    console.log('-- Starting Yggio Service Example backend --')
    await setup()
    console.log('-- Yggio Service Example backend started successfully --')
  } catch (e) {
    console.error('Could not start service:', e.stack)
    process.exit(1)
  }
}

start()
