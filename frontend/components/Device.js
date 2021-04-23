import { useState } from 'react'
import { mutate } from 'swr'

import useRequest from 'hooks/useRequest'

import { subscribe, unsubscribe } from 'actions/subscriptions'

import { Text, Flex, Spacer, Icon, Box } from '@chakra-ui/react'
import { TiStarburst } from 'react-icons/ti'

import SubscribeButton from './SubscribeButton'
import DataBox from './DataBox'

const SubscriptionButton = ({ item }) => {
  // TODO: This actually only checks if anyone is subscribed, not if we are in particular - fix!
  const subURI = `/api/subscriptions?iotnode=${item._id}`
  const { data: subStatus, error } = useRequest(subURI)

  // TODO: THIS should probably be a "Send data to Zapier button" - activating
  // both a subscription (Channel) from Yggio, and also adding a webhook to Zapier
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

  // TODO: Add a UI to allow users to select which data is sent to Zapier?
  // Some of the sensors have many data values and not all of them are relevant

  return (
    <Flex flexDirection="column" borderWidth="1px" borderRadius="lg" p="1.5" shadow="md">
      <Flex alignItems="center">
        <Text fontSize="l" fontWeight="semibold">{device.name}</Text>
        <Spacer />
        <Flex flexDirection="column" alignItems="start">
          <SubscriptionButton item={device} />
        </Flex>
      </Flex>
      <Flex flexDirection="column" alignItems="start">
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
    </Flex>
  )
}

export default Device