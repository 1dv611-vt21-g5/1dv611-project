import { useState, useEffect } from 'react'
import _ from 'lodash'
import { Heading, Container, Stack, Flex, Skeleton } from '@chakra-ui/react'
import Device from './Device'
import Error from './Error'
import useRequest from 'hooks/useRequest'

const Devices = () => {
  const { data: devices, error } = useRequest('/api/devices', { revalidateOnFocus: false })

  if (error) return <Error />

  return (
    <Container maxW="container.lg">
      <Flex my="2rem">
        <Heading as="h1">My devices</Heading>
      </Flex>
      <Stack spacing="1rem">
        {!devices && (
          <>
            <Skeleton borderRadius="md" height="70px" />
            <Skeleton borderRadius="md" height="70px" />
            <Skeleton borderRadius="md" height="70px" />
            <Skeleton borderRadius="md" height="70px" />
          </>
        )}
        {devices && devices.map((device, index) => (
          <Device key={index} device={device} />
        ))}
      </Stack>
    </Container>
  )
}

// Exports.
export default Devices
