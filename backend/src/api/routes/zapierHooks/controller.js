'use strict'

const ZapierHook = require('../../../models/ZapierHook')
const User = require('../../../models/User')
const Node = require('../../../models/Node')

// NOTE: varje user bör nog bara ha en webhook åt gången, skicka all data via den
// sen kan man filtrera och sortera i Zapier via https://zapier.com/help/create/customize/add-branching-logic-to-zaps-with-paths
const createZapierHook = async (req, res, next) => {
  try {
    console.log(req.body)
    const { hookUrl, userApiKey, yggioDeviceId } = req.body
    const user = await User.findOne({ api_key_zapier: userApiKey })



    const newHook = new ZapierHook({ owner: user.yggioId, target_url: hookUrl, deviceId: yggioDeviceId })
    await newHook.save()

    res.json(newHook)
  } catch (e) {
    res.status(400).send(e.errors)
  }
}

const deleteZapierHook = async (req, res, next) => {
  try {
    console.log(req.body)
    const { userApiKey, yggioDeviceId, hookUrl } = req.body
    const user = await User.findOne({ api_key_zapier: userApiKey })

    const deletedHook = await ZapierHook.findOneAndDelete({ owner: user.yggioId, target_url: hookUrl, deviceId: yggioDeviceId })

    res.json(deletedHook)
  } catch (e) {
    res.status(400).send(e.errors)
  }
}

const getUserSubscriptions = async (req, res, next) => {
  try {
    const userApiKey = req.query.key || req.query.api_key || req.header('X-API-KEY')
    console.log(userApiKey)
    const user = await User.findOne({ api_key_zapier: userApiKey })

    // find all subscribed nodes by this user
    const nodes = await Node.find({ owner: user.yggioId })

    console.log(nodes)
    res.json(nodes)
  } catch (e) {
    console.log(e)
    res.status(400).send(e.errors)
  }
}

const generateSampleData = async (req, res, next) => {
  try {
    const { userApiKey, yggioDeviceId } = req.query

    console.log(userApiKey)
    console.log(yggioDeviceId)
    const user = await User.findOne({ api_key_zapier: userApiKey })
    const node = await Node.findOne({ yggioId: yggioDeviceId, owner: user.yggioId })

    const update = {
      id: node.yggioId,
      name: node.displayName,
      data: {}
    }

    node.dataValues.forEach(dataValue => {
      update.data[dataValue.name] = { displayName: dataValue.displayName, value: 'SAMPLE' }
    })


    res.json([update])
  } catch (e) {
    res.status(400).send(e.errors)
  }
}

// Exports.
module.exports = {
  createZapierHook,
  deleteZapierHook,
  getUserSubscriptions,
  generateSampleData
}
