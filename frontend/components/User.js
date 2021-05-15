import useRequest from 'hooks/useRequest'
import { Heading, Text, Container, Stack, Box, Flex } from '@chakra-ui/react'

import CopyButton from './CopyButton'
import ResetApiKeyButton from './ResetApiKeyButton'
import { resetAPIkey } from 'actions/user'
import Loading from './Loading'


const User = () => {
  const userURI = '/api/user'
  const { data: savedUser, mutate, error } = useRequest(userURI) // Get user info from db

  const reset = async () => { //Changes API-key and updates rendered value 
    await resetAPIkey()
    mutate(userURI, {})
  }

  if (!savedUser && !error) { return <Loading /> }
  if (error) {
    return <Heading size="md" as="h2">Something went wrong</Heading>
  }

  return (
    <Container maxW="container.lg">
      <Flex my="2rem">
        <Heading as="h1">User</Heading>
      </Flex>
      <Box padding="10" bg="lime.white" borderRadius="md" shadow="md">
        <Stack spacing="1rem">
          <Heading size="md" as="h2">Username</Heading>
          <Text color="lime.grey">{savedUser.username}</Text>
        </Stack>
        <Stack mt="2rem" spacing="1rem">
          <Heading size="md" as="h2">API-key</Heading>
          <Text color="lime.grey">This is your API-key for authentication on Zapier:</Text>
          <Text fontWeight="600" color="teal.500"> {savedUser.api_key_zapier}</Text>
        </Stack>


        <CopyButton colorScheme='subscribe' apikey={savedUser.api_key_zapier}>
        </CopyButton>

        <Stack mt='2rem' spacing="1rem">
          <Heading size="md" as="h2">Reset API-key</Heading>
          <Text color="lime.grey">If you wish to reset your API-KEY, make sure to update the API-KEY on Zapier aswell.</Text>
        </Stack>

        <ResetApiKeyButton method={reset} colorScheme='red'></ResetApiKeyButton>

      </Box>
    </Container>
  )
}

// Exports.
export default User