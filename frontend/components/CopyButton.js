import React from 'react'
import { Button } from '@chakra-ui/react'

export default class CopyButton extends React.Component {
  copyCodeToClipboard = () => {
    // Is there a better solution?
    const el = document.createElement('textarea');
    el.value = this.props.apikey;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  render () {
    return (
      <Button
        shadow='md'
        colorScheme={this.props.colorScheme || 'blue'}
        size='sm'
        mt='1rem'
        borderRadius='sm'
        onClick={() => this.copyCodeToClipboard()}>
        Copy to clipboard
      </Button>
    )
  }
}
