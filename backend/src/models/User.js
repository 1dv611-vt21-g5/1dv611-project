/**
 * Mongoose model Users.
 *
 * @version 1.0.0
 */

'use strict'

const mongoose = require('mongoose')

// Create a schema.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  api_key_zapier: {
    type: String,
    required: false,
  },
  access_token_yggio: {
    type: String,
    required: false
  },
  refresh_token_yggio: {
    type: String,
    required: false
  },
  expiresAt_token_yggio: {
    type: String,
    required: false
  }
}, {
  timestamps: false
})

// TODO: Add generation of API key when user is registered, also add endpoints
// for removing current key and creating a new one (invalidating)
// Is a random (uuid-type) string enough? Or do we need to hash some values?
// If the API key is randomly generated it should be impossible to guess what
// another users key is - but we can still check it via the database


// Create a model using the schema.
const User = mongoose.model('User', userSchema)

// Exports.
module.exports = User
