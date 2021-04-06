import React from 'react';
import {Button} from 'reactstrap';

export default class SubscribeButton extends React.Component {
  handleClick = () => {
    this.props.method(this.props.device);
  }
  render () {
    return (
      <Button
        color={this.props.color}
        onClick={this.handleClick} >
        {this.props.children}
      </Button>
    );
  }
};
