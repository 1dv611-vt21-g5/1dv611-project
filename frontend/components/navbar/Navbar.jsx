/**
 * The Navbar component.
 *
 * @version 1.0
 */

import React from 'react'
import { MenuItems } from './MenuItems'

/**
  *
  */
const Navbar = () => {
  return (
    <nav className='navbarItems'>
      {MenuItems.map((item, index) => {
        return (
          <ul key={index}>
            <a className={item.cName} href={item.url}>{item.title}</a>
          </ul>
        )
      })}
    </nav>
  )
}

// Exports
export default Navbar
