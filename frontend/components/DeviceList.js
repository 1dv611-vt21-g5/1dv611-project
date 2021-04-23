import { useState, useEffect } from 'react'
import _ from 'lodash'

import { Heading, Container, Stack, Flex } from '@chakra-ui/react'

import Device from './Device'
import useRequest from 'hooks/useRequest'

const Devices = () => {

  const { data: devices, error } = useRequest('/api/devices')
  console.log(useRequest('/api/settings'))

  if (error) return <div>Oopsie!</div>
  if (!devices) return <div>Loading!</div>
  console.log(devices)
  return (
    <Container maxW="container.xl">
      <Flex my="2rem">
        <Heading as="h1">My devices</Heading>
      </Flex>
      <Stack spacing="1rem">
        {devices && devices.map((device, index) => (
          <Device key={index} device={device} />
        ))}
      </Stack>
    </Container>
  )
}

export default Devices
