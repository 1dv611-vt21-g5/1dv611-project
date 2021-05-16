import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  IconButton,
  Button,
  useDisclosure,
  Spinner,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Flex,
  Text,
  Spacer,
  Stack,
  Tooltip,
  useToast
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { MdClose } from 'react-icons/md'
import { useState, useEffect } from 'react'

import { subscribe, unsubscribe } from 'actions/subscriptions'

import JsonPathPicker from './JsonPathPicker'
import SubStatusIcon from './SubStatusIcon'

export const ModalWindow = ({ rawDevice, deviceDetails, isValidating, mutate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const { register, handleSubmit, formState: { errors } } = useForm()

  const savedData = deviceDetails?.data

  const [chosenDataPoints, setChosenDataPoints] = useState(savedData?.dataValues?.length >= 1 ? savedData?.dataValues : [])
  const [isInvalid, setIsInvalid] = useState(false)

  // used to hide the json path validation error when user first opens config modal
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useEffect(() => {
    if (savedData?.dataValues?.length >= 1) {
      setChosenDataPoints(savedData?.dataValues)
    }
  }, [deviceDetails])

  useEffect(() => {
    if (chosenDataPoints?.length === 0 && hasSubmitted) {
      setIsInvalid(true)
    } else {
      setIsInvalid(false)
    }
  }, [chosenDataPoints, hasSubmitted])

  // similiarly helps hide json path validation error when one re-opens a modal after closing it
  useEffect(() => {
    if (!isOpen) {
      setHasSubmitted(false)
    }
  }, [isOpen])

  const sub = async (data) => {
    const { status } = await subscribe(data)

    // tells SWR to re-fetch this device's data
    mutate()

    if (status === 200) {
      if (deviceDetails?.subscribed) {
        toast({
          title: 'Updated!',
          description: 'The device details have been updated.',
          status: 'success'
        })
      } else {
        toast({
          title: 'Subscribed!',
          description: 'Device will now send updates to Zapier.',
          status: 'success'
        })
      }
    } else {
      toast({
        title: 'Oops!',
        description: `Something went wrong. We couldn't subscribe to this device.`,
        status: 'error'
      })
    }
  }

  const unsub = async () => {
    setHasSubmitted(true)
    const { status } = await unsubscribe(rawDevice)

    // tells SWR to re-fetch this device's data
    mutate()

    if (status === 200) {
      toast({
        title: 'Unsubscribed!',
        description: 'Device will no longer send updates to Zapier.',
        status: 'success'
      })
    } else {
      toast({
        title: 'Oops!',
        description: `Something went wrong. We couldn't unsubscribe from this device.`,
        status: 'error'
      })
    }
    setHasSubmitted(false)
  }

  const onSubmit = async ({ name }) => {
    setHasSubmitted(true)


    if (chosenDataPoints.length >= 1) {
      const formData = {
        ...rawDevice,
        ...deviceDetails,
        displayName: name,
        dataPoints: chosenDataPoints
      }

      await sub(formData)
      setHasSubmitted(false)
    }
  }

  if (!deviceDetails) return <Spinner color="gray.400" />

  return (
    <div>
      <Button shadow="md" colorScheme="unsubscribe" onClick={onOpen}>Configure</Button>
      <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <Flex alignItems="center">
                <Text mr="0.5rem" fontSize="xl" fontWeight="700">Configure device for Zapier</Text>
                <Spacer />
                <Flex alignItems="center" fontSize="md" border="1px" borderRadius="md" px="2">
                  <SubStatusIcon subscribed={deviceDetails.subscribed} placement="bottom" />
                  <Text>{deviceDetails.subscribed ? 'Active' : 'Inactive'}</Text>
                </Flex>
                <IconButton onClick={onClose} ml="0.5rem" fontSize="2xl" size="xs" aria-label="Close Modal" icon={<MdClose />} />
              </Flex>
              <Text fontSize="sm" size="sm" fontWeight="500" textColor="gray.500">Change settings and select which data points will be sent to Zapier when the device updates.</Text>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing="1rem">
                  <FormControl id="name" isInvalid={errors.name}>
                    <FormLabel fontSize="lg" fontWeight="700">Display Name</FormLabel>
                    <Input {...register("name", { required: true, minLength: 1 })} type="text" defaultValue={deviceDetails?.data?.displayName || rawDevice.name} />
                    <FormErrorMessage>Name needs to be at least one character long.</FormErrorMessage>
                    <FormHelperText>Change the display name of the device to something more informative.</FormHelperText>
                  </FormControl>
                  <JsonPathPicker isInvalid={isInvalid} chosenDataPoints={chosenDataPoints} setChosenDataPoints={setChosenDataPoints} jsonData={rawDevice} />
                </Stack>
              </form>
            </ModalBody>
            <ModalFooter>
              {deviceDetails.subscribed ? (
                <>
                  <Tooltip placement="top" hasArrow label="Unsubscribe and stop sending device updates to Zapier.">
                    <Button isLoading={hasSubmitted || isValidating} onClick={unsub} colorScheme="red" mr="0.5rem">Unsubscribe</Button>
                  </Tooltip>
                  <Tooltip placement="top" hasArrow label="Update the settings for this device.">
                    <Button onClick={handleSubmit(onSubmit)} isLoading={hasSubmitted || isValidating} colorScheme="subscribe">Update</Button>
                  </Tooltip>
                </>
              ) : (
                <Button onClick={handleSubmit(onSubmit)} isLoading={hasSubmitted || isValidating} colorScheme="subscribe">Subscribe</Button>
              )}
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </div>
  )
}
