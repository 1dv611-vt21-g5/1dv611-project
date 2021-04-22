
'use strict'

const getSettings = (req, res, next) => { //getting ALL settings
    //res.status(200).send() // Not yet implemented
    const result = {"controller": "settings"}
    console.log("hello from settings controller")
    res.status(200).json(result)
  }
  
  const getSetting = (req, res, next) => { //get specific setting
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
  
  module.exports = {
    getSettings,
    getSetting,
    addSetting,
    editSetting,
    deleteSetting
  }
  