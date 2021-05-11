import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react'

export const ModalWindow = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  let hasData = false
  if (props.item.value) { hasData = true }

  const getValue = (value) => {
    if (value === true) { return 'true' }
    if (value === false) { return 'false' }

    const returnValue = []
    if (typeof value === 'object') {
      Object.entries(value).map(([key, data]) => (
        // returnValue.push(`${key}: ${data}. `)
        returnValue.push(`${checkIfObject(data)}`)
      ))
    } else {
      returnValue.push(`${value}.`)
    }

    return returnValue
  }

  const checkIfObject = (data) => {
    const returnValue = []
    if (typeof data === 'object') {
      Object.entries(data).map(([key, value]) => (
        returnValue.push(` ${key}: ${value}`)
      ))
    } else {
      returnValue.push(`${data}`)
    }

    return returnValue
  }

  return (
    <>
      {hasData
        ? (
          <div>
            <Button onClick={onOpen}>Send to Zapier</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay>
                <ModalContent>
                  <ModalHeader>{props.item.name}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    {Object.entries(props.item.value).map(([key, value]) => (
                      <div key={key}><span><p>{key}: {getValue(value)}</p></span></div>
                    ))}
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
                    <Button variant="ghost">Subscribe</Button>
                  </ModalFooter>
                </ModalContent>
              </ModalOverlay>
           </Modal>
          </div>
          )
        : (
            null
          )
      }
    </>
  )
}
