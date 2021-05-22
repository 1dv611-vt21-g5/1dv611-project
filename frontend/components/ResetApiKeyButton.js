import React from 'react'
import { Button } from '@chakra-ui/react'

export default class ResetApiKeyButton extends React.Component {
    handleClick = () => {
      this.props.method()
    }

    render () {
      return (
      <Button
        shadow='md'
        colorScheme={this.props.colorScheme || 'blue'}
        size='sm'
        mt='1rem'
        borderRadius='sm'
        onClick={this.handleClick}>
        Reset API-Key
      </Button>
      )
    }
}
