/**
 * Mongoose model Settings.
 *
 *
 * @version 1.0.0
 */

'use strict'

const mongoose = require('mongoose')

// Create a schema.
const settingSchema = new mongoose.Schema({
  node_id: {
    type: String,
    required: true
  },
  value_name: {
    type: String,
    required: true
  },
  interval: {
    type: String,
    required: true
  }
}, {
  timestamps: false
})

// Create a model using the schema.
const Setting = mongoose.model('Setting', settingSchema)

// Exports
module.exports = Setting
