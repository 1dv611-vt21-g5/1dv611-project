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
        colorScheme='purple'
        onClick={redirToYggio} >
        Login
        </Button>
    </div>
  )
}

export default Login
