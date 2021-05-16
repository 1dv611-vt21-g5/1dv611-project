import axios from 'axios'
import { statStr } from '../constants'

// TODO: fix these
export const subscribe = async device => {
  const payload = {
    name: device.name,
    displayName: device.displayName,
    nodeId: device._id,
    dataPaths: device.dataPoints,
    protocol: 'http'
  }

  return await axios.post(statStr.backendHost + '/api/subscriptions', payload, { withCredentials: true })
}

export const unsubscribe = device => {
  // TODO: fix these
  return axios.delete(statStr.backendHost + '/api/subscriptions/' + device._id, { withCredentials: true })
}

export const getSubscriptions = async iotnode => {
  const { data } = await axios.get(statStr.backendHost + '/api/subscriptions', { params: { iotnode }, withCredentials: true })
  return data
}
