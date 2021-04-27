import axios from 'axios'
import { statStr } from '../constants'

// TODO: fix these
export const subscribe = async device => {
  const payload = {
    name: device.name,
    nodeId: device._id,
    data: device?.value,
    protocol: 'http'
  }

  const { data } = await axios.post(statStr.backendHost + '/api/subscriptions', payload, { withCredentials: true })
  return data
}

export const unsubscribe = device => {
  return axios.delete(statStr.backendHost + '/api/subscriptions/' + device._id)
}

export const getSubscriptions = async iotnode => {
  const { data } = await axios.get(statStr.backendHost + '/api/subscriptions', { params: { iotnode }, withCredentials: true })
  return data
}
