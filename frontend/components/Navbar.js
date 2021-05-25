/* eslint-disable multiline-ternary */
import Link from 'next/link'
import { Text, Box } from '@chakra-ui/react'
import { logout } from 'actions/logout'
import useUser from 'hooks/useUser'


const Navbar = () => {
  const { user, mutate, error } = useUser()

  const handleLogout = async () => {
    await logout()
    mutate(null, false)
  }

  return (
    <nav className='navbarItems'>
      {user && !error ? ( // Use variable "user" instead?
        <>
          <Link href="/devices">
             <a className="navLinks"><Text color="lime.grey">Devices</Text></a> 
          </Link>
          <Link href="/user">
            <a className="navLinks"><Text color="lime.grey">User</Text></a>
          </Link>
          <Link href="/about">
            <a className="navLinks"><Text color="lime.grey">About</Text></a>
          </Link>
          <Box className="navLinks" cursor="pointer">
            <a onClick={handleLogout}><Text color="lime.grey">Logout</Text></a>
          </Box >
        </>
      ) : (
        <>
          <Link href="/about">
            <a className="navLinks"><Text color="lime.grey">About</Text></a>
          </Link>
          <Link href="/">
            <a className="navLinks"><Text color="lime.grey">Login</Text></a>
          </Link>
        </>
      )}
    </nav>
  )
}

export default Navbar
