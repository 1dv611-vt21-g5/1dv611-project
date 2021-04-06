import React from 'react';

import {subscribe, unsubscribe} from '../actions';
import SubscribeButton from './SubscribeButton';

export default class DeviceList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {devices: props.devices};
  }
  sub = async device => {
    await subscribe(device);
    device.subscribed = true;
    this.setState({devices: this.state.devices});
  }
  unsub = async device => {
    await unsubscribe(device);
    device.subscribed = false;
    this.setState({devices: this.state.devices});
  }
  SubscriptionButton = props => {
    return props.item.subscribed ? (
      <SubscribeButton
        color='danger'
        device={props.item}
        method={this.unsub}>
          Unsubscribe
      </SubscribeButton>
    ) : (
      <SubscribeButton
        color='success'
        device={props.item}
        method={this.sub}>
          Subscribe
      </SubscribeButton>
    );
  }
  makeList = () => {
    return this.props.devices.map((item, idx) => {
      return (
        <li className="deviceLi" key={idx}>
          <span>{item.name}</span>
          <this.SubscriptionButton item={item} />
        </li>
      );
    })
  }

  render () {
    return (
      <ul className="deviceUl">
        {this.makeList()}
      </ul>
    );
  }
};
