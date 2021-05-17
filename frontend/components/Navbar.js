import Link from 'next/link'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'

import { logout } from 'actions/logout'

const Navbar = () => {
  const router = useRouter()

  const handleLogout = async () => {
    await logout()

    router.push('/')
  }

  return (
    <nav className='navbarItems'>
      {/* TODO: Add loggedIn check here via useUser hook to determine which links are shown */}
      {false ? (
        <>
          <Link href="/about">
            <a className="navLinks">About</a>
          </Link>
          <Link href="/">
            <a className="navLinks">Login</a>
          </Link>
        </>
      ) : (
        <>
          <Link href="/devices">
            <a className="navLinks">Devices</a>
          </Link>
          <Link href="/user">
            <a className="navLinks">User</a>
          </Link>
          <Link href="/about">
            <a className="navLinks">About</a>
          </Link>
          <Box cursor="pointer">
            <a onClick={handleLogout} className="navLinks">Logout</a>
          </Box >
        </>
      )}
    </nav>
  )
}

export default Navbar