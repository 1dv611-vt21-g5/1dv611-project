import { ChakraProvider } from '@chakra-ui/react'
import { CookiesProvider } from 'react-cookie'
import theme from 'styles/theme'
import '../styles/globals.css'


function MyApp ({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </ChakraProvider>
  )
}

// Exports.
export default MyApp
