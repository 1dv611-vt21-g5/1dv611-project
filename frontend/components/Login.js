import React from 'react'
import { Button } from 'reactstrap'

import { redir } from '../actions'

const Login = () => {

  const redirToYggio = () => {
    redir()
  }

  return (
    <div className="something">
      <p>{state.name}, {state.age}</p>
      <Button onClick={clickTest}>
        Test
      </Button>
      <Button
        color='success'
        onClick={redirToYggio} >
        Login
        </Button>
    </div>
  )
}

export default Login
