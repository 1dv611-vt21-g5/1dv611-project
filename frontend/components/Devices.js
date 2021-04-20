import { useState, useEffect } from 'react'
import _ from 'lodash'

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
      <h1>My devices</h1>
      {devices && <DeviceList devices={data} setDevices={setDevices} />}
    </div>
  )
}

export default Devices

// export default class Devices extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {}
//   }

//   fillSubscriptionData (devices, subscriptions) {
//     devices.forEach(d => {
//       const sub = subscriptions.find(s => {
//         return s.iotnode === d._id
//       })
//       d.subscribed = !!sub
//     })
//   }

//   async setDevices () {
//     try {
//       const devices = await getDevices()
//       console.log(devices)
//       const subscriptions = _.flatten(await Promise.all(_.map(devices, d => {
//         return getSubscriptions(d._id)
//       })))
//       this.fillSubscriptionData(devices, subscriptions)

//       this.setState({ devices })
//     } catch (e) {
//       console.log('Could not fetch devices:', e.message)
//     }
//   }

//   displayDevices () {
//     if (this.state.devices) {
//       return <DeviceList devices={this.state.devices} />
//     }
//     this.setDevices()
//   }

//   render () {
//     return (
//       <div className="deviceDiv">
//         <h1>My devices</h1>
//         {this.state.devices && <DeviceList devices={this.state.devices} />}
//       </div>
//     )
//   }
// };
