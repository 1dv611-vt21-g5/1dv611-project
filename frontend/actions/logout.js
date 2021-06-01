import axios from 'axios'

import { statStr } from '../constants'

export const logout = async () => {
  await axios.post(`${statStr.backendHost}/api/auth/logout`, {}, { withCredentials: true })
}
