import { Container, Flex, Spinner } from '@chakra-ui/react'

const Loading = () => {
  return (
    <Container maxW="container.lg" my="10rem" centerContent>
      <Flex alignContent="center" flexDirection="column" textAlign="center">
        <Spinner label="Loading" thickness="4px" size="xl" color="unsubscribe.500" />
      </Flex>
    </Container>
  )
}

export default Loading