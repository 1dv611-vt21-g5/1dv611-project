import dynamic from 'next/dynamic'
const ReactJson = dynamic(() => import('react-json-view'), { ssr: false }) // this module doesn't like being server-rendered
import { Heading, Flex, Wrap, IconButton, Editable, EditableInput, EditablePreview, Tooltip, Divider } from '@chakra-ui/react'
import { ImCross } from 'react-icons/im'
import { useState } from 'react'

// TODO: remove this later
const dataSample = {
  "_id": "5f579b486fd953000607d72a",
  "nodeType": "SimpleDevice",
  "__v": 0,
  "category": "uncategorized",
  "createdAt": "2020-09-08T14:55:04.585Z",
  "description": "",
  "deviceModelName": undefined,
  "latlng": [],
  "name": "Z-Wave Strips Guard 700 Meeting Room",
  "rabbitRouting": {
    "value": [
      "rest-api-socket",
      "publisher"
    ]
  },
  "reportedAt": "2021-04-23T12:52:53.836Z",
  "translatedFrom": "5f579b066fd953000607d6f2",
  "updatedAt": "2021-04-23T12:52:53.877Z",
  "value": {
    "doorIsOpen": true,
    "nested": {
      "deeply": {
        "very": "deeply"
      }
    }
  },
  "version": 17
}

/**
 * Renders a DataPoint badge for selected data points below the JSON tree, with options to edit the displayName or remove the datapoint entirely.
 * @param {object} props A props object containing the data (name, displayName, path) as well as edit and remove click handlers.
 * @returns JSX
 */
const DataPoint = ({ data, handleRemove, handleEdit }) => {
  return (
    <Flex shadow="md" alignItems="center" fontWeight="500" fontFamily="mono" pl="0.25rem" pr="0.1rem" textColor="white" bg="orange.400" rounded="lg">
      <Tooltip placement="bottom" hasArrow label={`Click to adjust the display name [${data.path.join('/')}]`}>
        <Editable onSubmit={(e) => handleEdit(e, data)} defaultValue={data.name}>
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Tooltip>
      <Tooltip hasArrow label="Click to remove">
        <IconButton shadow="sm" onClick={() => handleRemove(data)} ml="0.25rem" fontSize="10px" aria-label="Remove Datapoint" colorScheme="orange" size="xs" icon={<ImCross />} />
      </Tooltip>
    </Flex>
  )
}

/**
 * Renders an interactive tree from a JSON object representing an IoT sensor - allows a user to pick which fields they want to send onward to Zapier.
 * @param {object} props An object containing jsonData (NYI: also state/setState hooks for use in a larger form)
 * @returns JSX
 */
const JsonPathPicker = ({ jsonData, /* chosenDataPoints, setChosenDataPoints */ }) => {

  // TODO: this state should live in a parent form component
  const [chosenDataPoints, setChosenDataPoints] = useState([])

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
    <Flex flexDir="column" p="1rem" maxWidth="fit-content" bg="white" rounded="lg">
      <Heading as="h4" size="md" mb="0.2rem">Data Points</Heading>
      <Heading as="h5" size="sm" color="gray.600">Click to select which data points you wish to send to Zapier</Heading>
      <Divider mt="0.5rem" mb="1rem" />
      <ReactJson
        theme={'bright:inverted'}
        style={{ fontFamily: 'Inconsolata, monospace', background: 'transparent' }}
        src={jsonData || dataSample} // TODO: remove dataSample
        name={false}
        iconStyle={'triangle'}
        enableClipboard={false}
        onSelect={handleSelect}
        shouldCollapse={false}
      />
      {chosenDataPoints.length >= 1 && (
        <>
          <Heading as="h4" size="md" mt="1rem">Selected</Heading>
          <Wrap spacing="0.5rem" mt="0.5rem">
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
