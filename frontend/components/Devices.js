import { useState, useEffect } from 'react'
import _ from 'lodash'

import { Heading } from '@chakra-ui/react'

import DeviceList from './DeviceList'
import { getDevices, getSubscriptions } from 'actions'
import useRequest from 'hooks/useRequest'

const Devices = () => {
  const [devices, setDevices] = useState({})

  const { data, error } = useRequest('/api/devices')
  console.log(data)

  if (error) return <div>Oopsie!</div>
  if (!data) return <div>Loading!</div>
  return (
    <div className="deviceDiv">
      <Heading as="h1">My devices</Heading>
      {devices && <DeviceList devices={data} setDevices={setDevices} />}
    </div>
  )
}

export default Devices
