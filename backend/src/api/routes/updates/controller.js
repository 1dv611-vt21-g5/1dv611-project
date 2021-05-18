'use strict'

const axios = require('axios')

const Node = require('../../../models/Node')
const ZapierHook = require('../../../models/ZapierHook')


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

    //1b. We check that there are actual Zaps using this device before doing more processing
    const zapsExist = await ZapierHook.exists({ deviceId: deviceId })

    if (!zapsExist) {
      return res.status(200).send()
    }

    // 2. we find all Nodes with this id (as each user can have their own settings)
    const nodes = await Node.find({ yggioId: deviceId })

    // 3. We grab the updated device data from the request
    const updatedDevice = req.body.payload.iotnode

    matchNewDataWithNode(nodes, updatedDevice)

    return res.status(200).send()
  } catch (e) {
    console.log(e)
    return res.status(400).send()
  }
}

/**
 * Iterates through a all node objects
 *
 * @param {object[]} nodes An array of node objects
 * @param {string} deviceId ID of node device from request
 * @returns {void}
 */
const matchNewDataWithNode = async (nodes, data) => {
  // 4. Iterate through all found nodes and parse them according to the saved Node schema
  await Promise.all(nodes.map(async (node) => {
    // id and name added to allow for differentiation in Zapier
    const update = {
      id: node.yggioId,
      name: node.displayName,
      data: {}
    }

    node.dataValues.forEach(dataValue => {
      update.data[dataValue.name] = { displayName: dataValue.displayName, value: getNestedValue(data, dataValue.path) }
    })

    sendToZapier(node, update)
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
  const zapierHooks = await ZapierHook.find({ owner: node.owner, deviceId: node.yggioId })

  await Promise.all(zapierHooks.map(async (hook) => {
    await axios.post(hook.target_url, data)
  }))
}

// Exports.
module.exports = {
  receiveData,
  getNestedValue,
  matchNewDataWithNode,
  sendToZapier
}
