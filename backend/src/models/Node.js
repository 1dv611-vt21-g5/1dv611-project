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
  path: [String]
}, { toJSON: { virtuals: true } })

// adds a derived depth field to the schema
dataValueSchema.virtual('depth').get(() => this.path.length)

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
  // OBS! This field is here to represent "how to reach the data" on a given IoT node
  // Some devices we want more than one value (temperature AND humidity) and it can be deeply nested
  // for example:
  // {
  //   blabla: "bla",
  //   blabla: "blebb",
  //   values: {
  //     temperature: {
  //       value: 24,
  //       unit: "celsius"
  //     },
  //     humidity: 50
  //   }
  // }
  // To get both the temperature and humidity value into our object we would create a Node object like:
  // new Node({
  //   ... (other stuff)
  //   dataValues: {
  //     temperature: {
  //       path: ['values', 'temperature', 'values']
  //     },
  //     humidity: {
  //       path: ['values', 'humidity']
  //     }
  //   }
  // })
  // This will establish a schema that will allow us to get at the data later (device['values']['temperature']['values']) or
  // const getNestedValue = (object, pathsArray) => {
  //   if (pathsArray.length === 1) {
  //     return object[pathsArray[0]]
  //   }
  //
  //   const innerObject = object[pathsArray[0]]
  //   const innerArray = [...pathsArray.slice(1)]
  //   getNestedValue(innerObject, innerArray)
  // }
  dataValues: {
    type: Map,
    of: dataValueSchema
  },
  // min interval in minutes (if any)
  minInterval: {
    type: Number
  },
  maxInterval: {
    type: Number
  },
  // latest time this device sent data
  lastSend: {
    type: Date
  }
}, {
  timestamps: true
})

// Create a model using the schema.
const Node = mongoose.model('Node', nodeSchema)

// Exports.
module.exports = Node
