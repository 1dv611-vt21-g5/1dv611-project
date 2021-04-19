import { useState } from 'react'
import { mutate } from 'swr'

import useRequest from 'hooks/useRequest'

import { subscribe, unsubscribe } from 'actions'
import SubscribeButton from './SubscribeButton'

const SubscriptionButton = ({ item }) => {
  // TODO: This actually only checks if anyone is subscribed, not if we are in particular - fix!
  const subURI = `/api/subscriptions?iotnode=${item._id}`
  const { data: subStatus, error } = useRequest(subURI)

  const sub = async () => {
    await subscribe(item)
    mutate(subURI)
  }

  const unsub = async () => {
    await subscribe(item)
    mutate(subURI)
  }

  if (!subStatus) return <p>Add loadspinner here!</p>

  return subStatus.length >= 1
    ? (
      <SubscribeButton
        colorScheme='red'
        device={item}
        method={unsub}>
        Unsubscribe
      </SubscribeButton>
    )
    : (
      <SubscribeButton
        colorScheme='green'
        device={item}
        method={sub}>
        Subscribe
      </SubscribeButton>
    )
}

const Device = ({ device }) => {

  return (
    <li className="deviceLi">
      <span>{device.name}</span>
      <SubscriptionButton item={device} />
    </li>
  )
}

export default Device