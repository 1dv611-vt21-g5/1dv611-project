import axios from 'axios'
import { statStr } from '../constants'

// export const getDevices = async () => {
//   // const { data } = await axios.get(statStr.backendHost + '/api/devices', { withCredentials: true })
//   // return data
// }

export const devices = async () => {
  window.location = '/devices'
}