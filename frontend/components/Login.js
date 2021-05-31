import React, { useEffect } from 'react'
import { Button } from '@chakra-ui/react'
import { redir } from '../actions'
import { useRouter } from 'next/router'

import useUser from 'hooks/useUser'


const Login = () => {
  const router = useRouter()
  const { user, loading, error } = useUser()

  const redirToYggio = () => {
    redir()
  }

  useEffect(() => {
    if (user && !error) {
      router.push('/devices')
    }
  }, [user, loading])

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
