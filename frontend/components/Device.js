import { useState } from 'react'
import { mutate } from 'swr'

import useRequest from 'hooks/useRequest'

import { subscribe, unsubscribe } from 'actions'

import { Text, Flex, Spacer, Icon, Box } from '@chakra-ui/react'
import { TiStarburst } from 'react-icons/ti'

import SubscribeButton from './SubscribeButton'
import DataBox from './DataBox'

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
  const [showData, setShowData] = useState(false)

  return (
    <Flex borderWidth="1px" borderRadius="lg" p="1.5" alignItems="center" shadow="md">
      <Flex flexDirection="column" alignItems="start">
        <Text fontSize="l" fontWeight="semibold">{device.name}</Text>
        {device.value && (
          <Box mt="1rem">
            {showData ? (
              <DataBox setShowData={setShowData} data={device.value} />
            ) : (
              <Flex alignItems="center" cursor="pointer">
                <Icon as={TiStarburst} mr="0.1rem" color="yellow.400" />
                <Text onClick={() => setShowData(true)} fontSize="xs">This device has reported data, click to show!</Text>
              </Flex>
            )}
          </Box>
        )}
      </Flex>
      <Spacer />
      <SubscriptionButton item={device} />
    </Flex>
  )
}

export default Device