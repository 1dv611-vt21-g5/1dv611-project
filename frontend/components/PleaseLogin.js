import React from 'react'
import useUser from 'hooks/useUser'
import Login from 'components/Login'

/**
 * Checks is offline and try to access online pages
 *
 * @param {boolean} subscribed Wether the device is subscriped to or not.
 */
const PleaseLogin = ({ children }) => {
    const { user } = useUser()
    if (!user) return <Login />
    return children
}

export default PleaseLogin
