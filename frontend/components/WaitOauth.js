import { useCode } from '../actions'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const WaitOauth = () => {
  const router = useRouter()
  const [message, setMessage] = useState({
    message: `
        Please do hold...
      `,
    cls: 'oauth_wait'
  })
  const [isLoading, setIsLoading] = useState(false)
  const { code } = router.query

  const fetchOAuth = async () => {
    try {
      setIsLoading(true)
      await useCode(code)
      setIsLoading(false)
      setMessage({
        message: 'OAuth login successful! Redirecting to devices...',
        cls: 'oauth_success'
      })
      setTimeout(() => {
        router.push('/devices')
      }, 2000)
    } catch (err) {
      console.log('Error:', err)
      setMessage({
        message: 'OAuth login failed. Redirecting to login...',
        cls: 'oauth_fail'
      })
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }
  }

  useEffect(() => {
    if (code) {
      fetchOAuth()
    } else {
      setMessage({
        message: 'Could not authenticate.',
        cls: 'oauth_fail'
      })
    }
  }, [code])

  useEffect(() => {
    if (isLoading) {
      setMessage({
        message: `
        Please do hold...
      `,
        cls: 'oauth_wait'
      })
    }

  }, [isLoading])

  return (
    <div className="something">
      <p className={message.cls}> {message.message} </p>
    </div>
  )
}

// Exports.
export default WaitOauth
