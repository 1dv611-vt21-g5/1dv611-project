import { useState } from 'react'

import useRequest from 'hooks/useRequest'
import { subscribe, unsubscribe } from 'actions/subscriptions'
import { Text, Flex, Spacer, Icon, Box, Spinner } from '@chakra-ui/react'
import { TiStarburst } from 'react-icons/ti'
import SubscribeButton from './SubscribeButton'
import DataBox from './DataBox'

const SubscriptionButton = ({ item }) => {
  const subURI = `/api/subscriptions?iotnode=${item._id}`
  const { data: subStatus, mutate, isValidating } = useRequest(subURI)

  // TODO: THIS should probably be a "Send data to Zapier button" - activating
  // both a subscription (Channel) from Yggio, and also adding a webhook to Zapier
  const sub = async () => {
    await subscribe(item)
    mutate(subURI, { subscribed: true })
  }

  const unsub = async () => {
    await unsubscribe(item)
    mutate(subURI, { subscribed: false })
  }

  console.log(subStatus)

  if (!subStatus) return <Spinner />

  return subStatus?.subscribed
    ? (
      <SubscribeButton
        colorScheme='unsubscribe'
        device={item}
        method={unsub}>
        Unsubscribe
      </SubscribeButton>
    )
    : (
      <SubscribeButton
        colorScheme="subscribe"
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
    <Flex bg="lime.white" flexDirection="column" borderWidth="0px" borderRadius="md" p="1.5" shadow="sm">
      <Flex alignItems="center">
        <Text p={3} fontSize="l" fontWeight="semibold">{device.name}</Text>
        <Spacer />
        <Flex flexDirection="column" alignItems="start">
          <SubscriptionButton pr={3} item={device} />
        </Flex>
      </Flex>
      <Flex flexDirection="column" alignItems="start">
        {device.value && (
          <Box pb={3} pl={3} >
            {showData
              ? (
                <DataBox setShowData={setShowData} data={device.value} />
              )
              : (
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

// Exports.
export default Device
