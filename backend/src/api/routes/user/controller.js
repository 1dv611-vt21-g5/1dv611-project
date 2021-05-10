'use strict'

const User = require('../../../models/User')

const getUser = async (req, res, next) => {
  // Get users API KEY
  console.log("Getting user info")

  try {
    const { user } = req.session
    const savedUser = await User.findOne({ yggioId: user._id })
    //return res.json(savedUser)
    res.status(200).json(savedUser)
  } catch (error) {
    res.status(400).send()
  }
  
}

// Exports.
module.exports = {
    getUser
}
