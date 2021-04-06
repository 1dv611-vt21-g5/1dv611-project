import axios from 'axios';
import {statStr} from '../../constants';

export const subscribe = async device => {
  const payload = {
    name: 'My channel',
    nodeId: device._id,
    protocol: 'http'
  };

  const {data} = await axios.post(statStr.backendHost + '/api/subscriptions', payload);
  return data;
};

export const unsubscribe = device => {
  return axios.delete(statStr.backendHost + '/api/subscriptions/' + device._id);
};

export const getSubscriptions = async iotnode => {
  const {data} = await axios.get(statStr.backendHost + '/api/subscriptions', {params: {iotnode}});
  return data;
};
