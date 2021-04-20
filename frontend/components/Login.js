import React from 'react'
import { Button } from 'reactstrap'

import { redir } from '../actions'

const Login = () => {

  const redirToYggio = () => {
    redir()
  }

  return (
    <div className="something">
      <Button
        color='success'
        onClick={redirToYggio} >
        Login
        </Button>
    </div>
  )
}

export default Login
