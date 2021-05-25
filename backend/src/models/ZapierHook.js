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
    // type: mongoose.Types.ObjectId,
    type: String,
    required: true
  },
  target_url: {
    type: String,
    required: true
  },
  deviceId: {
    type: String,
    required: true
  },
  // latest time this hook sent data
  lastSend: {
    type: Date
  }
}, {
  timestamps: false
})

// Create a model using the schema.
const ZapierHook = mongoose.model('ZapierHook', zapierHookSchema)

// Exports.
module.exports = ZapierHook
