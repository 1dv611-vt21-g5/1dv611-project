import _ from 'lodash'
import useRequest from 'hooks/useRequest'
import { Heading, Text, Container, Stack, Box, Link, Flex } from '@chakra-ui/react'
import CopyButton from './CopyButton'
import ResetApiKeyButton from './ResetApiKeyButton'
import { resetAPIkey } from 'actions/user'

const User = () => {
  const { data: savedUser, error } = useRequest('/api/user')

  const reset = async () => {
    await resetAPIkey()
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
          <Heading size="md" as="h2">API key</Heading>
          <Text color="lime.grey">This is your API-key for authentication on Zappier:</Text>
          <Text color="teal.500"> {savedUser.api_key_zapier}</Text> 
        </Stack>

        <CopyButton colorScheme='subscribe' apikey={savedUser.api_key_zapier}>
        </CopyButton>

        <Stack mt='1rem' spacing="1rem">
          <Heading size="md" as="h2">Reset API-key</Heading>
          <Text color="lime.grey">If you wish to reset your API-KEY, make sure to update the API-KEY aswell.</Text>
        </Stack>

        <ResetApiKeyButton method={reset} colorScheme='subscribe'></ResetApiKeyButton>
        
      </Box>
    </Container>
  )
}

// Exports.
export default User