/**
 * Mongoose model iot Nodes.
 *
 * @version 1.0.0
 */

'use strict'

const mongoose = require('mongoose')

// TODO: Tror det är viktigt att vi alltid omtolkar alla IoT-devices output
// och skickar tillbaka ett uniformt objekt med sensorns namn osv - det blir 
// lättare i Zapier då

// TODO: behövs även en route för "data som finns just nu" s.k. Perform List
// https://platform.zapier.com/docs/faq

const dataValueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  displayName: { type: String },
  path: [String]
})

// Create a schema.
const nodeSchema = new mongoose.Schema({
  // devices yggio id
  yggioId: {
    type: String,
    required: true
  },
  // plaintext name
  name: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  // id of subscription from yggio (channel)
  subscriptionId: {
    type: String,
    required: true
  },
  // user id TODO: is this needed?
  owner: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  dataValues: {
    type: [dataValueSchema],
    required: true
  },
  // min interval in minutes (if any)
  minInterval: {
    type: Number // NYI
  },
  maxInterval: {
    type: Number // NYI
  }
}, {
  timestamps: true
})

// Create a model using the schema.
const Node = mongoose.model('Node', nodeSchema)

// Exports.
module.exports = Node
