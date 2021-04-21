/**
 * Mongoose configuration.
 *
 * @version 1.0.0
 */

'use strict'

const mongoose = require('mongoose')
const common = require('../config/common')

/**
* Establishes a connection to the database.
*
* @returns {Promise} Resolves to this if connection succeeded.
*/
module.exports.connect = async () => {
  // Bind connection to events (to get notifications).
  mongoose.connection.on('connected', () => console.log('Mongoose connection is open.'))
  mongoose.connection.on('error', err => console.error(`Mongoose connection error has occurred: ${err}`))
  mongoose.connection.on('disconnected', () => console.log('Mongoose connection is disconnected.'))

  // If the Node process ends, close the Mongoose connection.
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose connection is disconnected due to application termination.')
      process.exit(0)
    })
  })

  // Connect to the server.
  return mongoose.connect(common.DB_CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
