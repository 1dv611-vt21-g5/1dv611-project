import dynamic from 'next/dynamic'
const ReactJson = dynamic(() => import('react-json-view'), { ssr: false }) // this module doesn't like being server-rendered
import { Box, Container, Flex } from '@chakra-ui/react'
import { useState } from 'react'

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


const JsonPath = () => {
  const [chosenDataPoints, setChosenDataPoints] = useState([])

  const handleSelect = (selection) => {
    console.log(selection)
  }

  return (
    <Flex alignItems="center" justifyContent="center" p="1rem" maxWidth="fit-content" bg="white" rounded="lg">
      <ReactJson
        theme={'bright:inverted'}
        style={{ fontFamily: 'Inconsolata, monospace', background: 'transparent' }}
        src={dataSample}
        name={false}
        iconStyle={'triangle'}
        enableClipboard={false}
        onSelect={handleSelect}
        shouldCollapse={false}
      />
    </Flex>
  )
}

export default JsonPath