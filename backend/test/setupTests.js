const http = require('http')
const express = require('express')
const supertest = require('supertest')
const session = require('express-session')
const yggioConnect = require('yggio-connect')

const config = require('../src/config')
const { secret } = require('../db/oauth-info.json')

const expressConfig = require('../src/components/express-config')
const mongoose = require('../src/components/mongoose')

// const app = express()



// expressConfig.apply(app)

// app.all('*', function (req, res, next) {
//   req.session.user = {
//     accessToken: "768ac85a-ffab-44c2-a221-95e614f90070",
//     refreshToken: "b3b91bdc-7b67-4a04-ae6e-bd50d997a6e5",
//     expiresAt: "2021-06-06T11:10:11.037Z",
//     _id: "6076b42ec054220006cebbff",
//     username: "ak222ye@student.lnu.se",
//     globalVisibility: true
//   }
// })

// const server = http.createServer(app)

const createServer = async () => {
  config.yggio.refreshCallback = () => { }
  await yggioConnect.init(config.yggio, secret)

  const app = express()
  app.use('*', function (req, res, next) {
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
