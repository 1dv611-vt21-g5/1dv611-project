import React from 'react'

import Device from 'components/Device'

import { Container, Stack } from '@chakra-ui/react'

import { subscribe, unsubscribe } from 'actions'
import SubscribeButton from './SubscribeButton'

const DeviceList = ({ devices, setDevices }) => {
  console.log('hello', devices)
  return (
    <Container maxW="container.xl">
      <Stack spacing="1rem">
        {devices.map((device, index) => (
          <Device key={index} device={device} />
        ))}
      </Stack>
    </Container>
  )
}

export default DeviceList
