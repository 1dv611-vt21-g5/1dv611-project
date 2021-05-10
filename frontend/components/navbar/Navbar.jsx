/**
 * The Navbar component.
 *
 * @version 1.0
 */

import { useState } from 'react'
import { MenuItems } from './MenuItems'
const { logout } = require('actions/logout')
const { about } = require('actions/about')
const { devices } = require('actions/devices')
const { user } = require('actions/user')

/**
  *
  */
const Navbar = () => {
  const [loggedOut, setLogout] = useState(false)
  const [aboutP, setAboutP] = useState(false)
  const [userP, setUserP] = useState(false)
  const [devicesP, setDevicesP] = useState(false)

  const handleClick = (item) => {
    if (item.title === 'Logout') {
      setLogout(true)
    } else if (item.title === 'About') {
      setAboutP(true)
    } else if (item.title === 'User') {
      setUserP(true)
    } else if (item.title === 'Devices') {
      setDevicesP(true)
    }
  }

  const wantsToLogout = () => {
    if (loggedOut) {
      logout()
    }
  }

  const aboutPage = () => {
    if (aboutP) {
      about()
    }
  }

  const userPage = () => {
    if (userP) {
      user()
    }
  }

  const devicesPage = () => {
    if (devicesP) {
      devices()
    }
  }

  return (
    <nav className='navbarItems'>
      {MenuItems.map((item, index) => {
        console.log(index)
        return (
          <ul key={index}>
            {item.title === 'Logout'
              ? (
              // TODO, align to right
              // <Flex my="2rem">
              <button title={item.title} className={item.cName} href={item.url} onClick={() => handleClick(item)}>{item.title}</button>
              // </Flex>
                )
              : (
              <button title={item.title} className={item.cName} href={item.url} onClick={() => handleClick(item)}>{item.title}</button>
                )}
          </ul>
        )
      })}
         {wantsToLogout()}
         {aboutPage()}
         {userPage()}
         {devicesPage()}
         {devicesPage()}
    </nav>
  )
}

// Exports.
export default Navbar
