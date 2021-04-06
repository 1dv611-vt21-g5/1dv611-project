import React from 'react';
import _ from 'lodash';

import DeviceList from './DeviceList';
import {getDevices, getSubscriptions} from '../actions';

export default class Devices extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  fillSubscriptionData (devices, subscriptions) {
    devices.forEach(d => {
      const sub = subscriptions.find(s => {
        return s.iotnode === d._id;
      });
      d.subscribed = !!sub;
    });
  }
  async setDevices () {
    try {
      const devices = await getDevices();
      const subscriptions = _.flatten(await Promise.all(_.map(devices, d => {
        return getSubscriptions(d._id);
      })));
      this.fillSubscriptionData(devices, subscriptions);

      this.setState({devices});
    } catch (e) {
      console.log('Could not fetch devices:', e.message);
    }
  }
  displayDevices () {
    if (this.state.devices) {
      return <DeviceList devices={this.state.devices} />;
    }
    this.setDevices();
  }
  render () {
    return (
      <div className="deviceDiv">
        <h1>My devices</h1>
        {this.displayDevices()}
      </div>
    );
  }
};
