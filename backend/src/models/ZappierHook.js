/**
 * Mongoose model Zappier hooks.
 *
 * @version 1.0.0
 */

'use strict'

const mongoose = require('mongoose')

// Create a schema.
const zappierHookSchema = new mongoose.Schema({
 }, {
   timestamps: false
 })
 
 // Create a model using the schema.
 const ZappierHook = mongoose.model('ZappierHook', zappierHookSchema)
 
 // Exports.
 module.exports = ZappierHook