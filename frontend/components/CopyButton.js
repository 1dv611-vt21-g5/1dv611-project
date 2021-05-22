import React from 'react'
import { Button } from '@chakra-ui/react'

export default class CopyButton extends React.Component {
  copyCodeToClipboard = () => {
    // TODO Is there a better solution? Kanske: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    const el = document.createElement('textarea')
    el.value = this.props.apikey
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
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
