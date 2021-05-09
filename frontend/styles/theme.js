import { extendTheme } from '@chakra-ui/react'

const brandGreen = '#74ad96'
const brandOrange = '#e89b3f'

const theme = extendTheme({
  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'Inconsolata, monospace'
  },
  colors: {
    lime: {
      background: '#f0f3f7',
      white: '#fff',
      grey: '#878c91'
    },
    subscribe: {
      500: brandGreen,
      600: '#8dc4ae'
    },
    unsubscribe: {
      500: brandOrange,
      600: '#eda958'
    }
  }
})

// Exports.
export default theme
