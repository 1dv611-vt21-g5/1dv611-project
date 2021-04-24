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

// Create a schema.
const nodeSchema = new mongoose.Schema({
  nodeType: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  values: { // Not applicable for devices of type "zwave-device"
    type: Array,
    required: true
  }
}, {
  timestamps: true
})

// Create a model using the schema.
const Node = mongoose.model('Node', nodeSchema)

// Exports.
module.exports = Node
