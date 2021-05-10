'use strict'

const { nanoid } = require('nanoid')
const User = require('../../../models/User')

const getUser = async (req, res, next) => {
  try {
    console.log("getting user")
    const { user } = req.session
    const savedUser = await User.findOne({ yggioId: user._id })
    res.status(200).json(savedUser)

  } catch (error) {
    res.status(400).send()
  }
}

const resetApiKey = async (req, res, next) => {
    try {
      const { user } = req.session
      
      await User.findOneAndUpdate({ yggioId: user._id }, {
        api_key_zapier: nanoid()
      })

      res.status(200).send() // or code 205?
    } catch (error) {
      res.status(400).send()
    }
  }

// Exports.
module.exports = {
    getUser,
    resetApiKey
}
