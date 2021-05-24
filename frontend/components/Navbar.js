/* eslint-disable multiline-ternary */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { logout } from 'actions/logout'
import useUser from 'hooks/useUser'


const Navbar = () => {
  const router = useRouter()
  const {user, mutate, error} = useUser()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  // const userNoPermission = () => {
  //   const route = router.route
  //   // TODO wait for update??? mutate???
  //   if (route == '/devices' && !user || route == '/user' && !user) {
  //     router.push('/')
  //   }
  // }

  return (
    <nav className='navbarItems'>
      {/* TODO: Redirect from pages with no permission if no user  */}
      {!error ? ( // Use variable "user" instead?
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
          <Box className="navLinks" cursor="pointer">
            <a onClick={handleLogout}>Logout</a>
          </Box >
        </>
      ) : (
        <> 
        <Link href="/about">
          <a className="navLinks">About</a>
        </Link>
        <Link href="/">
          <a className="navLinks">Login</a>
        </Link>
      </>
      )}
    </nav>
  )
}

export default Navbar
