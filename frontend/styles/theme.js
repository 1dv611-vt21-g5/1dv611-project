import { extendTheme } from '@chakra-ui/react'

const brandGreen = '#49796C'
const brandOrange = '#D37809'

const theme = extendTheme({
  components: {
    Button: {
      sizes: {
        xs: {
          height: "30px",
          width: "30px"
        }
      }
    }
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'Inconsolata, monospace'
  },
  colors: {
    lime: {
      background: '#f0f3f7',
      white: '#fff',
      grey: '#696B6D'
    },
    subscribe: {
      500: brandGreen,
      600: '#456E67'
    },
    unsubscribe: {
      500: brandOrange,
      600: '#B4690E'
    },
    teal: {
      500: brandGreen,
    }
  }
})

// Exports.
export default theme
