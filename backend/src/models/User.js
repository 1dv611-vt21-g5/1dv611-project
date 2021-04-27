/**
 * Mongoose model Users.
 *
 * @version 1.0.0
 */

'use strict'

const mongoose = require('mongoose')
const { nanoid } = require('nanoid')

// Create a schema.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  api_key_zapier: {
    type: String,
    required: false,
    default: () => nanoid() // randomly generate on creation
  },
  yggioId: {
    type: String
    //type: mongoose.Types.ObjectId TODO: change to key id
  },
  yggioAccessToken: {
    type: String
  },
  yggioRefreshToken: {
    type: String
  },
  yggioExpiresAt: {
    type: Date
  }
}, {
  timestamps: false
})


// TODO:  add endpoints
// for removing current key and creating a new API key (invalidating)


// Create a model using the schema.
const User = mongoose.model('User', userSchema)

// Exports.
module.exports = User
