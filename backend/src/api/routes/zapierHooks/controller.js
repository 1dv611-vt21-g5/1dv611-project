const ZapierHook = require('../../../models/ZapierHook')
const User = require('../../../models/User')

// NOTE: varje user bör nog bara ha en webhook åt gången, skicka all data via den
// sen kan man filtrera och sortera i Zapier via https://zapier.com/help/create/customize/add-branching-logic-to-zaps-with-paths
const createZapierHook = async (req, res, next) => {
  try {
    console.log(req.body)
    const { hookUrl, userApiKey } = req.body
    const user = await User.findOne({ api_key_zapier: userApiKey })

    // removes any existing zapier hook
    await ZapierHook.findOneAndDelete({ owner: user.yggioId })


    const newHook = new ZapierHook({ owner: user.yggioId, target_url: hookUrl })
    await newHook.save()

    res.json(newHook)
  } catch (e) {
    res.status(400).send(e.errors)
  }
}

const deleteZapierHook = async (req, res, next) => {
  try {
    console.log(req.body)
    const { userApiKey } = req.body
    const user = await User.findOne({ api_key_zapier: userApiKey })

    const deletedHook = await ZapierHook.findOneAndDelete({ owner: user.yggioId })

    res.json(deletedHook)
  } catch (e) {
    res.status(400).send(e.errors)
  }
}

module.exports = {
  createZapierHook,
  deleteZapierHook
}
