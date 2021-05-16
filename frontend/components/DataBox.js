import dynamic from 'next/dynamic'
const ReactJson = dynamic(() => import('react-json-view'), { ssr: false })
import { Box, useOutsideClick, Collapse, ScaleFade, Flex, Icon, Text } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { TiDocumentText } from 'react-icons/ti'

const DataBox = ({ device }) => {
  const [showData, setShowData] = useState(false)

  const ref = useRef()
  useOutsideClick({
    ref: ref,
    handler: () => setShowData(false)
  })

  return (
    <Box>
      {!showData && (
        <ScaleFade initialScale={0.9} in={!showData}>
          <Flex maxW="21.5rem" border="1px" borderRadius="md" px="0.4rem" py="0.1rem" onClick={() => setShowData(true)} alignItems="center" cursor="pointer">
            <Icon as={TiDocumentText} mr="0.1rem" />
            <Text fontSize="xs">Click to display the raw device info sent by this device.</Text>
          </Flex>
        </ScaleFade>
      )}
      <Collapse in={showData} animateOpacity>
        <Box ref={ref}
          border="1px"
          borderColor="gray.200"
          borderRadius="lg"
          shadow="inner"
          cursor='pointer'
          maxH="45rem"
          overflowY="scroll"
          mt="1rem"
          p="0.5rem"
          width={{ base: "auto", md: "40rem", lg: "60.5rem" }} >
          <ReactJson
            theme={'bright:inverted'}
            style={{ fontFamily: 'Inconsolata, monospace', background: 'transparent' }}
            src={device}
            name={false}
            iconStyle={'triangle'}
            enableClipboard={false}
            collapsed={2}
          />
        </Box >
      </Collapse>
    </Box>
  )
}

// Exports.
export default DataBox
