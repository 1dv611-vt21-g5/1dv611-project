import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { Flex, Spacer, Box } from '@chakra-ui/react'

const Page = ({ children }) => {

  return (
    <Flex flexDirection="column" className="App" bg="lime.background" minH="100vh">
      <Head>
        <title>Ysocial - Connect Yggio and Zapier</title>
      </Head>
      <Flex className="App-header">
        <Link href="/devices">
          <Box cursor="pointer">
            <Image priority={true} src="/img/logo.png" className="App-logo" alt="logo" layout="intrinsic" width={188} height={72} />
          </Box>
        </Link>
        <Spacer />
        <Navbar />
      </Flex>
      {children}
      <Spacer />
      <footer className="App-footer">
        <p>A project in course 1dv611 at Linneaus university. </p>
      </footer>
    </Flex>
  )
}

// Exports.
export default Page
