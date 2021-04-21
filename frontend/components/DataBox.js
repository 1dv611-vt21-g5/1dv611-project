import { Box, Flex, Text } from '@chakra-ui/react'

const DataBox = ({ setShowData, data }) => {
  return (
    <Box onClick={() => setShowData(false)}>
      {Object.entries(data).map(([key, value]) => (
        <Flex>
          <Text fontSize="xs" mr="0.5rem" fontWeight="bold">{key}:</Text>
          <Text fontSize="xs">{JSON.stringify(value)}</Text>
        </Flex>
      ))}
    </Box>
  )
}

export default DataBox