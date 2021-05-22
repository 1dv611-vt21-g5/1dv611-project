import { Container, Flex, Spinner, Text } from '@chakra-ui/react'

/**
 * Simple "full screen" Loading component. Displays a spinner in the middle of the screen.
 */
const Loading = ({ message }) => {
  return (
    <Container maxW="container.lg" my="10rem" centerContent>
      <Flex alignContent="center" alignItems="center" flexDirection="column" textAlign="center">
        <Spinner label="Loading" thickness="4px" size="xl" color="unsubscribe.500" />
        {message && <Text mt="1rem">{message}</Text>}
      </Flex>
    </Container>
  )
}

export default Loading
