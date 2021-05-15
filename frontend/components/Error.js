import { Container, Flex, Heading, Text } from '@chakra-ui/react'

/**
 * Simple error component, displays a "full screen" error message.
 * 
 * @param {string} message Custom error message to display. 
 */
const Error = ({ message }) => {

  return (
    <Container maxW="container.lg" my="10rem" centerContent>
      <Flex alignContent="center" flexDirection="column" textAlign="center">
        <Heading as="h1">Oops! Something went wrong!</Heading>
        <Text my="1rem">{message || `We couldn't contact Yggio's servers.`}</Text>
        <Text fontSize="6xl">😔</Text>
      </Flex>
    </Container>
  )
}

export default Error