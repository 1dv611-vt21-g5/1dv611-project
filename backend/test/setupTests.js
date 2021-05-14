const express = require('express')

const yggioConnect = require('yggio-connect')

const config = require('../src/config')
const { secret } = require('../db/oauth-info.json')

const expressConfig = require('../src/components/express-config')

/**
 * Startar en fejkad variant av vår server för att kunna köra tester mot, sen injicerar den en fejkad req.session.user.
 * @returns 
 * 
 */
const createServer = async () => {
  config.yggio.refreshCallback = () => { }
  await yggioConnect.init(config.yggio, secret)

  const app = express()
  app.use('*', function (req, res, next) {

    // Fejkad session
    req.session = {}
    req.session.user = {
      _id: "6076b42ec054220006cebbff"
    }

    next()
  })
  expressConfig.apply(app)


  return app
}

module.exports = createServer
