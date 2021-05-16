import dynamic from 'next/dynamic'
const ReactJson = dynamic(() => import('react-json-view'), { ssr: false }) // this module doesn't like being server-rendered
import { Text, Flex, Wrap, IconButton, Editable, EditableInput, EditablePreview, Tooltip, Divider, Box } from '@chakra-ui/react'
import { ImCross } from 'react-icons/im'
import { useState } from 'react'


/**
 * Renders a DataPoint badge for selected data points below the JSON tree, with options to edit the displayName or remove the datapoint entirely.
 * @param {object} props A props object containing the data (name, displayName, path) as well as edit and remove click handlers.
 * @returns JSX
 */
const DataPoint = ({ data, handleRemove, handleEdit }) => {
  return (
    <Flex shadow="md" alignItems="center" fontWeight="300" pl="0.5rem" textColor="white" bg="orange.400" rounded="lg">
      <Tooltip placement="bottom" hasArrow label={`Click to adjust the display name [${data.path.join('/')}]`}>
        <Editable pr="0.5rem" onSubmit={(e) => handleEdit(e, data)} defaultValue={data.displayName || data.name}>
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Tooltip>
      <Tooltip hasArrow label="Click to remove">
        <IconButton shadow="sm" onClick={() => handleRemove(data)} fontSize="10px" aria-label="Remove Datapoint" colorScheme="orange" size="xs" icon={<ImCross />} />
      </Tooltip>
    </Flex>
  )
}

/**
 * Renders an interactive tree from a JSON object representing an IoT sensor - allows a user to pick which fields they want to send onward to Zapier.
 * @param {object} props An object containing jsonData (NYI: also state/setState hooks for use in a larger form)
 * @returns JSX
 */
const JsonPathPicker = ({ jsonData, chosenDataPoints, setChosenDataPoints, isInvalid }) => {

  /**
   * Handles clicks on the JSON tree and adds the node to state
   * @param {object} selection An object containing the name and path data - received from react-json-view
   */
  const handleSelect = (selection) => {
    const newDataPoint = {
      name: selection.name,
      displayName: selection.name, // enhancing the object with an extra displayName property so the user can decide what to call something
      path: [...selection.namespace, selection.name]
    }

    setChosenDataPoints(prevState => {
      // prevents duplicate items - JSON.stringify not optimal but shouldnt matter here
      if (prevState.some(oldDataPoint => JSON.stringify(oldDataPoint.path) === JSON.stringify(newDataPoint.path))) {
        return prevState
      } else {
        return [...prevState, newDataPoint]
      }
    })
  }

  /**
   * Removes the chosen data point from state.
   * @param {object} oldDataPoint The data point we wish to remove - received from remove button on DataPoint component
   */
  const handleRemove = (oldDataPoint) => {
    setChosenDataPoints(prevState => prevState.filter(dataPoint => JSON.stringify(dataPoint.path) !== JSON.stringify(oldDataPoint.path)))
  }

  /**
   * Updates the display name of a data point and merges it back into the state array.
   * @param {string} newData The new display name.
   * @param {object} oldDataPoint The old data point object.
   */
  const handleEdit = (newData, oldDataPoint) => {
    setChosenDataPoints(prevState => prevState.map(dataPoint => {
      if (JSON.stringify(dataPoint.path) === JSON.stringify(oldDataPoint.path)) {
        return { ...dataPoint, displayName: newData }
      }

      return dataPoint
    }))
  }

  return (
    <Flex flexDir="column" maxWidth="fit-content" bg="white" rounded="lg">
      <Text fontSize="lg" fontWeight="700" mb="0.2rem">Data Points</Text>
      <Text fontSize="sm" fontWeight="400" color="gray.500">Click to select which data points you wish to send to Zapier</Text>
      <Flex className="jsonPicker" maxH="30rem">
        <Box border={isInvalid ? '2px' : '1px'}
          borderColor={isInvalid ? 'red.500' : "gray.200"}
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
            src={jsonData || dataSample} // TODO: remove dataSample
            name={false}
            iconStyle={'triangle'}
            enableClipboard={false}
            onSelect={handleSelect}
            shouldCollapse={false}
            collapsed={2}
          />
        </Box>
      </Flex>
      {isInvalid && <Text mt="0.5rem" fontSize="sm" color="red.500">You need to select at least one data point.</Text>}
      {chosenDataPoints.length >= 1 && (
        <>
          <Text fontSize="lg" fontWeight="700" mt="1rem">Selected</Text>
          <Text fontSize="sm" fontWeight="400" color="gray.500">Click individual labels to adjust their display name.</Text>
          <Wrap spacing="0.5rem" mt="0.5rem" maxW="30rem">
            {chosenDataPoints.map((dataPoint, index) => (
              <DataPoint key={index} data={dataPoint} handleRemove={handleRemove} handleEdit={handleEdit} />
            ))}
          </Wrap>
        </>
      )}
    </Flex>
  )
}

export default JsonPathPicker
