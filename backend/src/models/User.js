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
        required: true,
        maxlength: [300, 'Too long username']
    },
    api_key_zapier: {
      type: String,
      required: false,
    },
    access_toke_yggio: {
        type: String,
      required: false
    }
  }, {
    timestamps: false
  })
  
  // Create a model using the schema.
  const User = mongoose.model('User', userSchema)
  
  // Exports.
  module.exports = User