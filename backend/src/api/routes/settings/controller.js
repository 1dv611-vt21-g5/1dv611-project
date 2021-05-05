'use strict'

const getSettings = (req, res, next) => { // getting ALL settings
  const result = { controller: 'settings' }
  res.status(200).json(result)
}

const getSetting = (req, res, next) => { // get specific setting
  res.status(501).send() // Not yet implemented
}

const addSetting = (req, res, next) => { // get individual setting
  res.status(501).send() // Not yet implemented
}

const editSetting = (req, res, next) => { // editing a setting
  res.status(501).send() // Not yet implemented
}

const deleteSetting = (req, res, next) => { // Remove setting
  res.status(501).send() // Not yet implemented
}

// Exports.
module.exports = {
  getSettings,
  getSetting,
  addSetting,
  editSetting,
  deleteSetting
}
