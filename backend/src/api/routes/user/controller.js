'use strict'

const { nanoid } = require('nanoid')
const User = require('../../../models/User')

/**
 * Get active user info.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object}
 */
const getUser = async (req, res, next) => {
  try {
    console.log('getting user')

    const { user } = req.session
    const savedUser = await User.findOne({ yggioId: user._id })
    return res.status(200).json(savedUser)
  } catch (error) {
    return res.status(400).send()
  }
}

/**
 * Resets users API-KEY for ZApier authentication.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object}
 */
const resetApiKey = async (req, res, next) => {
  try {
    console.log('resetting apikey')
    const { user } = req.session
    await User.findOneAndUpdate({ yggioId: user._id }, {
      api_key_zapier: nanoid()
    })

    return res.status(200).send() // or code 205?
  } catch (error) {
    return res.status(400).send()
  }
}

// Exports.
module.exports = {
  getUser,
  resetApiKey
}
