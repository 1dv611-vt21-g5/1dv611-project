import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Spinner
} from '@chakra-ui/react'

import useRequest from 'hooks/useRequest'
import { SubscriptionContainer } from './SubscriptionContainer'

export const ModalWindow = ({ device, subStatus }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!subStatus) return <Spinner />
  // let hasData = false
  // if (props.item.value) { hasData = true }

  // const mapObject = (returnValue, value) => {
  //   if (value) {
  //     Object.entries(value).map(([key, data]) => (
  //       returnValue.push(` ${getKey(key)} ${getData(data)}`)
  //     ))
  //   }
  //   return returnValue
  // }

  // const getValue = (value) => {
  //   if (value === true) { return 'true' }
  //   if (value === false) { return 'false' }

  //   const returnValue = []
  //   if (value && typeof value === 'object') {
  //     Object.entries(value).map(([key, data]) => (
  //       returnValue.push(` ${getKey(key)} ${getData(data)} `)
  //     ))
  //   } else {
  //     returnValue.push(`${value}`)
  //   }
  //   return returnValue
  // }

  // const getKey = (key) => {
  //   if (isNaN(key) && key !== 'value') {
  //     return `${key}: `
  //   } else {
  //     return ''
  //   }
  // }

  // const getData = (value) => {
  //   const returnValue = []
  //   if (value && typeof value === 'object') {
  //     const obj = mapObject(returnValue, value)
  //     returnValue.push(obj)
  //   } else {
  //     returnValue.push(`${value}`)
  //   }
  //   return returnValue
  // }

  return (
    <div>
      <Button shadow="md" colorScheme="unsubscribe" onClick={onOpen}>Configure</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>{device.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div>test</div>
            </ModalBody>
            <ModalFooter>
              <Button>Test</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </div>
  )
}
