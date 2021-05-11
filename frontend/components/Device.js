import { useState } from 'react'
import {
  Text, Flex, Spacer, Icon, Box
} from '@chakra-ui/react'
import { TiStarburst } from 'react-icons/ti'
import DataBox from './DataBox'
import { ModalWindow } from './ModalWindow'

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
          <ModalWindow item={device} />
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
