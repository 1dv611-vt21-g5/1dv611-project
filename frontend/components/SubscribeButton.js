import React from 'react'
import { Button } from '@chakra-ui/react'

export default class SubscribeButton extends React.Component {
  handleClick = () => {
    this.props.method(this.props.device)
  }

  render() {
    return (
      <Button
        colorScheme={this.props.colorScheme || 'blue'}
        size='sm'
        m='1rem'
        borderRadius='sm'
        onClick={this.handleClick} >
        {this.props.children}
      </Button>
    )
  }
}
