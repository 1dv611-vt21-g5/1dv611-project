import { useState } from 'react'
import { mutate } from 'swr'

import useRequest from 'hooks/useRequest'

import { subscribe, unsubscribe } from 'actions'

import { Text, Flex, Spacer } from '@chakra-ui/react'

import SubscribeButton from './SubscribeButton'

const SubscriptionButton = ({ item }) => {
  // TODO: This actually only checks if anyone is subscribed, not if we are in particular - fix!
  const subURI = `/api/subscriptions?iotnode=${item._id}`
  const { data: subStatus, error } = useRequest(subURI)

  const sub = async () => {
    await subscribe(item)
    mutate(subURI)
  }

  const unsub = async () => {
    await subscribe(item)
    mutate(subURI)
  }

  if (!subStatus) return <p>Add loadspinner here!</p>

  return subStatus.length >= 1
    ? (
      <SubscribeButton
        colorScheme='orange'
        device={item}
        method={unsub}>
        Unsubscribe
      </SubscribeButton>
    )
    : (
      <SubscribeButton
        colorScheme='green'
        device={item}
        method={sub}>
        Subscribe
      </SubscribeButton>
    )
}

const Device = ({ device }) => {

  return (
    <Flex borderWidth="1px" borderRadius="lg" p="1.5" alignItems="center" shadow="md">
      <Text fontSize="l" fontWeight="semibold">{device.name}</Text>
      <Spacer />
      <SubscriptionButton item={device} />
    </Flex>
  )
}

export default Device