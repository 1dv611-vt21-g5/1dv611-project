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
// {
//   accessToken: 'bb68c638-6f41-41e1-a21b-a8519ee032a6',
//   refreshToken: 'dea4afe5-1b68-4c02-8a03-6d430df1f250',
//   expiresAt: '2021-05-21T22:36:29.050Z',
//   scope: undefined,
//   _id: '6076b42ec054220006cebbff',
//   username: 'ak222ye@student.lnu.se',
//   globalVisibility: true
// }
const code = async (req, res, next) => {
  try {
    const redirectUri = redirectUris[req.query.redirect_uri]
    const freshUser = await redeemCode(req.query.code, redirectUri)
    // updateUser(freshUser);
    console.log(freshUser)
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
