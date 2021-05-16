import { useState } from 'react'
import {
  Text, Flex, Spacer, Icon, Box, Spinner, Tooltip
} from '@chakra-ui/react'
import { VscSymbolNamespace } from 'react-icons/vsc'

import DataBox from './DataBox'
import { ModalWindow } from './ModalWindow'
import SubStatusIcon from './SubStatusIcon'

import useRequest from 'hooks/useRequest'

const Device = ({ device }) => {
  const subURI = `/api/subscriptions?iotnode=${device._id}`
  const { data: deviceDetails, mutate, isValidating } = useRequest(subURI, { revalidateOnFocus: false })

  const hasDisplayName = deviceDetails?.data?.displayName
  const largeSizing = { base: 'sm', sm: 'md', md: 'lg' }
  const smallSizing = { base: 'xs', sm: 'xs', md: 'sm' }

  return (
    <Flex bg="lime.white" flexDirection="column" borderRadius="md" p="3" shadow="sm">
      <Flex>
        <Flex flexDirection="column">
          {hasDisplayName && (
            <Text fontSize={{ base: 'sm', sm: 'md', md: 'lg' }} fontWeight="bold" wordBreak="break-word">{deviceDetails.data.displayName}</Text>
          )}
          <Text fontSize={hasDisplayName ? smallSizing : largeSizing} fontWeight="semibold" color="gray.600" wordBreak="break-word">{device.name}</Text>
        </Flex>
        <Spacer />
        <Flex alignItems="center">
          {deviceDetails && <SubStatusIcon subscribed={deviceDetails.subscribed} />}
          <ModalWindow rawDevice={device} deviceDetails={deviceDetails} isValidating={isValidating} mutate={mutate} />
        </Flex>
      </Flex>
      <Flex mt="0.5rem" flexDirection="column" alignItems="start">
        {device && (
          <DataBox device={device} />
        )}
      </Flex>
    </Flex>
  )
}

// Exports.
export default Device
