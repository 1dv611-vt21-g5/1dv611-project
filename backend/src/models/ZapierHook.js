/**
 * Mongoose model Zapier hooks.
 *
 * @version 1.0.0
 */

'use strict'

const mongoose = require('mongoose')

// Create a schema.
const zapierHookSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  targetUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: false
})

// Create a model using the schema.
const ZapierHook = mongoose.model('ZapierHook', zapierHookSchema)

// Exports.
module.exports = ZapierHook
