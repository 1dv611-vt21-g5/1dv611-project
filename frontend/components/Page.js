import Head from 'next/head'
import Navbar from '../components/navbar/Navbar'
import { Flex, Spacer } from '@chakra-ui/react'

const Page = ({ children }) => {
  // if (children.type.name === 'Devices') {
  //   navbar = <Navbar />
  // }

  return (
    <Flex flexDirection="column" className="App" bg="lime.background" minH="100vh">
      <Head>
        <title>Ysocial - Connect Yggio and Zapier</title>
      </Head>
      <Flex className="App-header">
        <a title="home" href="/"><img src="/img/logo.png" className="App-logo" alt="logo" /></a>
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
