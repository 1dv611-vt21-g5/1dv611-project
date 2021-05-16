'use strict'

const axios = require('axios')

const Node = require('../../../models/Node')
const User = require('../../../models/User')
const ZapierHook = require('../../../models/ZapierHook')

const { routes: { getNode } } = require('yggio-connect')

/**
 * Get incoming updates from Yggio, process and send to Zapier.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object}
 */
const receiveData = async (req, res, next) => {
  try {
    // 1. request comes in, we grab yggio device id
    const { deviceId } = req.params

    //TODO: AFTER DEMO: We currently trust anyone who sends an update with a deviceId
    // Maybe we should add some kind of check to make sure it's actually from Yggio

    // 2. we find all Nodes with this id
    const nodes = await Node.find({ yggioId: deviceId })

    // 4 alt. Grab the data from the update itself
    // TODO: the payload from yggio is enough!!
    // it contains iotnode, diff, event - we can find the values on iotnode (it is the whole object)
    console.log(req.body)

    matchNewDataWithNode(nodes, deviceId)

    return res.status(200).send()
  } catch (e) {
    return res.status(400).send()
  }
}

/**
 * Iterates through a nested object step-by-step to return a value
 *
 * @param {object} object A nested object to parse, f.e. `{ a: { b: { c: 25 }}}`
 * @param {string[]} pathsArray An array of field names to step through, f.e. `['a', 'b', 'c']`
 * @returns The value of the final key in pathsArray, f.e. `25`
 */
const getNestedValue = (object, pathsArray) => {
  if (pathsArray.length === 1) {
    return object[pathsArray[0]]
  }
  const innerObject = object[pathsArray[0]]
  const innerArray = [...pathsArray.slice(1)] // returns prev array with first item removed
  return getNestedValue(innerObject, innerArray)
}


/**
 * Iterates through a all node objects
 *
 * @param {object[]} nodes An array of node objects
 * @param {string} deviceId ID of node device from request
 * @returns {void}
 */
const matchNewDataWithNode = async (nodes, deviceId) => {
  // 3. Iterate through all found nodes
  await Promise.all(nodes.map(async (node) => {
    // 4a. Grab the users info from db and use that to authenticate a device request
    // NOTE: A user needs to be logged in for this to work, so maybe we need to remove the logout button
    const {
      username,
      yggioAccessToken: accessToken,
      yggioRefreshToken: refreshToken,
      yggioExpiresAt: expiresAt } = await User.findOne({ yggioId: node.owner })

    // 4b. Fetch the latest device data from Yggio
    const deviceData = await getNode({
      username,
      accessToken,
      refreshToken,
      expiresAt
    }, deviceId)

    // 5. Parse data - See comment in models/Node for what this is doing
    const data = {}
    node.dataValues.forEach((value, key) => { // JS Maps verkar ha key och value bakofram??
      data[key] = getNestedValue(deviceData, value.path)
    })

    sendToZapier(node, data)
  }))
}

/**
 * Gets zapier hook and sends to Zapier
 *
 * @param {object} node The node device 
 * @param {object} data New data to send to Zapier
 * @returns {void}
 */
const sendToZapier = async (node, data) => {
  const zapierHook = await ZapierHook.findOne({ owner: node.owner })
  //const zapierHook = await ZapierHook.find({owner: node.owner}) // Many possible webhooks?
  console.log(zapierHook.target_url)
  await axios.post(zapierHook.target_url, {
    deviceName: node.name,
    data
  })
}

// Exports.
module.exports = {
  receiveData,
  getNestedValue,
  matchNewDataWithNode,
  sendToZapier
}
