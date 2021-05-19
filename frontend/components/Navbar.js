import Link from 'next/link'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { logout } from 'actions/logout'
import { useUser } from 'hooks/UserContext'

const Navbar = () => {
  const router = useRouter()
  const user = useUser() // TODO USE THE HOOK AND SET VALUE

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <nav className='navbarItems'>
      {/* TODO: Redirect from pages with no permission if no user  */}
      {user? ( // Use variable "user"
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