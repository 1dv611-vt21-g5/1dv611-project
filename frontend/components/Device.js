import { useState } from 'react'
import {
  Text, Flex, Spacer, Icon, Box, Spinner, Tooltip
} from '@chakra-ui/react'
import { TiStarburst } from 'react-icons/ti'

import DataBox from './DataBox'
import { ModalWindow } from './ModalWindow'
import SubStatusIcon from './SubStatusIcon'

import useRequest from 'hooks/useRequest'

const Device = ({ device }) => {
  const subURI = `/api/subscriptions?iotnode=${device._id}`
  const { data: subStatus, mutate, isValidating } = useRequest(subURI)

  return (
    <Flex bg="lime.white" flexDirection="column" borderRadius="md" p="3" shadow="sm">
      <Flex>
        <Text fontSize={{ base: 'xs', sm: 'sm', md: 'md' }} fontWeight="semibold" wordBreak="break-word">{device.name}</Text>
        <Spacer />
        <Flex alignItems="center">
          {subStatus && <SubStatusIcon subscribed={subStatus.subscribed} />}
          <ModalWindow device={device} subStatus={subStatus} />
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
