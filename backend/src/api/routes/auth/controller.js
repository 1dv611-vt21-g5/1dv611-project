const User = require('../../../models/User')

const {
  provider: {
    getDetails,
    redeemCode
  }
} = require('yggio-connect')

const { yggio: { provider: { redirectUris } } } = require('../../../config')

const { updateUser } = require('../../../components/db')

// Get your providerDetails from yggio after registering your
// service in Yggio (in this example that is already done in src/index.js)
const info = (req, res) => {
  
  const clientId = getDetails().provider.client_id

  return res.json({
    redirectUris,
    clientId
  })
}

// Send code to oauthCode route, along with redirectUri
// Receive accessToken and refreshToken, destroy the session
// and regenerate a new one along with the fresh user
// Remove accessToken and refreshToken before sending it back
// uncomment updateUser and its associated function to save the user
// to json in /db/users.json

const code = async (req, res, next) => {
  try {
    const redirectUri = redirectUris[req.query.redirect_uri]
    const freshUser = await redeemCode(req.query.code, redirectUri)
    // updateUser(freshUser);
    console.log(freshUser)

    // creates new user if none exists
    await User.findOneAndUpdate({ username: freshUser.username }, {
      username: freshUser.username,
    }, {
      upsert: true,
      setDefaultsOnInsert: true
    })

    return req.session.destroy(destroyErr => {
      if (destroyErr) return next(destroyErr)

      return req.sessionStore.regenerate(req, regenErr => {
        if (regenErr) return next(regenErr)

        req.session.user = freshUser
        const resUser = unsetProps(freshUser)

        return res.json(resUser)
      })
    })
  } catch (e) {
    next(e)
  }
}

// create a copy of freshUser and format, removing access/refreshToken
const unsetProps = user => {
  const resUser = Object.assign({}, user)
  delete resUser.accessToken
  delete resUser.refreshToken
  delete resUser.expiresAt
  return resUser
}

module.exports = {
  code,
  info
}
