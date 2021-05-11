import axios from 'axios'
import { statStr } from '../constants'

export const user = async () => {
  window.location = '/user'
}

export const resetAPIkey = async () => {
  return await axios.put(statStr.backendHost + '/api/user', {}, { withCredentials: true })
}