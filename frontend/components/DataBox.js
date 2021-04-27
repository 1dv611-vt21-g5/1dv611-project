import { Box, Flex, Text } from '@chakra-ui/react'

const DataBox = ({ setShowData, data }) => {
  return (
    <Box cursor='pointer' onClick={() => setShowData(false)}>
      {Object.entries(data).map(([key, value]) => (
        <DataItem key={key} dataKey={key} value={value} />
      ))}
    </Box>
  )
}

const DataItem = ({ dataKey, value }) => {
  return (
    <Flex>
      <Text fontSize='xs' mr='0.5rem' fontWeight='bold'>{dataKey}:</Text>
      <Text fontSize='xs' textAlign='left' maxW='40rem' isTruncated>{parseData(value)}</Text>
    </Flex>
  )
}

const parseData = (data) => {
  if (typeof data === 'object' && data !== null) {
    if (Object.keys(data)?.length > 1) {
      return JSON.stringify(data)
    }

    return JSON.stringify(data['value'])
  }

  return JSON.stringify(data)
}

// Exports.
export default DataBox
