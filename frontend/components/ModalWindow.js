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

  const mapObject = (returnValue, value) => {
    if (value) {
      Object.entries(value).map(([key, data]) => (
        returnValue.push(` ${getKey(key)} ${getData(data)}`)
      ))
    }
    return returnValue
  }

  const getValue = (value) => {
    if (value === true) { return 'true' }
    if (value === false) { return 'false' }

    const returnValue = []
    if (value && typeof value === 'object') {
      Object.entries(value).map(([key, data]) => (
        returnValue.push(` ${getKey(key)} ${getData(data)} `)
      ))
    } else {
      returnValue.push(`${value}`)
    }
    return returnValue
  }

  const getKey = (key) => {
    if (isNaN(key) && key !== 'value') {
      return `${key}: `
    } else {
      return ''
    }
  }

  const getData = (value) => {
    const returnValue = []
    if (value && typeof value === 'object') {
      const obj = mapObject(returnValue, value)
      returnValue.push(obj)
    } else {
      returnValue.push(`${value}`)
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
                      <p key={key}><span style={{ fontWeight: 'bold' }}>{key}: </span><span>{getValue(value)}</span></p>
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
