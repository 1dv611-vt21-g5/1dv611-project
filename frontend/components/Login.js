import React from 'react'
import { Button } from '@chakra-ui/react'
import { redir } from '../actions'

const Login = () => {
  const redirToYggio = () => {
    redir()
  }

  return (
    <div className="something">
      <Button
        colorScheme='subscribe'
        onClick={redirToYggio} >
        Login
        </Button>
    </div>
  )
}

// Exports.
export default Login
