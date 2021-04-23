/**
 * The Navbar component.
 *
 * @version 1.0
 */

import { useState } from 'react'
import { MenuItems } from './MenuItems'
const { logout } = require('actions/logout')
const { about } = require('actions/about')

/**
  *
  */
const Navbar = () => {
  const [loggedOut, setLogout] = useState(false)
  const [aboutP, setAboutP] = useState(false)

  const handleClick = (item) => {
    if (item.title === 'Logout') {
      setLogout(true)
    } else if (item.title === 'About') {
      setAboutP(true)
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

  return (
    <nav className='navbarItems'>
      {MenuItems.map((item, index) => {
        return (
          <ul key={index}>
            <button className={item.cName} href={item.url} onClick={() => handleClick(item)}>{item.title}</button>
            {/* <a className={item.cName} href={item.url}>{item.title}</a> */}
          </ul>
        )
      })}
         {wantsToLogout()}
         {aboutPage()}
    </nav>
  )
}

// Exports
export default Navbar
