import _ from 'lodash'
import useRequest from 'hooks/useRequest'
import { Heading, Text, Container, Stack, Code, Box, Link, Flex } from '@chakra-ui/react'

const User = () => {

  const { data: savedUser, error } = useRequest('/api/user')

  return (
    <Container maxW="container.lg">
      <Flex my="2rem">
        <Heading as="h1">User</Heading>
      </Flex>
      <Box padding="10" bg="lime.white" borderRadius="md" shadow="md">
        <Stack spacing="1rem">
          <Heading size="md" as="h2">Username</Heading>
          <Text color="lime.grey">{savedUser.username}</Text>
          <Heading size="md" as="h2">API key</Heading>
          <Text color="lime.grey">This is your API-key for authentication on Zappier:</Text>
          <Code color="teal.500"> {savedUser.api_key_zapier} // MAKE A COPY BUTTON</Code> 
        </Stack>
      </Box>
    </Container>
  )
}

// Exports.
export default User