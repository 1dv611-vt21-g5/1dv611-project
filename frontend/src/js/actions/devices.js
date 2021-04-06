import axios from 'axios';
import {statStr} from '../../constants';

export const getDevices = async () => {
  const {data} = await axios.get(statStr.backendHost + '/api/devices');
  return data;
};
