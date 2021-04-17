import axios from 'axios'
import { statStr } from '../constants'

export const redir = async () => {
  const { data } = await axios.get(statStr.backendHost + '/api/auth/info', { withCredentials: true })
  console.log(data)
  const clientId = encodeURIComponent(data.clientId)
  const redirectUri = encodeURIComponent(data.redirectUris.browser)
  window.location = `${statStr.oauthURL}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`
}
