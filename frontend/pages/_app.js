import { ChakraProvider } from '@chakra-ui/react'
import { CookiesProvider } from 'react-cookie'
import theme from 'styles/theme'
import '../styles/globals.css'
import {UserProvider} from '../hooks/UserContext';


function MyApp ({ Component, pageProps }) {
  return (
  <UserProvider>
    <ChakraProvider theme={theme}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </ChakraProvider>
  </UserProvider>
  )
}

// Exports.
export default MyApp
