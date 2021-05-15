import {
  Spinner
} from '@chakra-ui/react'
import SubscribeButton from './SubscribeButton'

import useRequest from 'hooks/useRequest'
import { subscribe, unsubscribe } from 'actions/subscriptions'

export const SubscriptionContainer = (props) => {
  const subURI = `/api/subscriptions?iotnode=${props.item.item._id}`
  const { data: subStatus, mutate } = useRequest(subURI)

  // TODO: THIS should probably be a "Send data to Zapier button" - activating
  // both a subscription (Channel) from Yggio, and also adding a webhook to Zapier
  const sub = async () => {
    await subscribe(props.item.item)
    mutate(subURI, { subscribed: true })
  }

  const unsub = async () => {
    await unsubscribe(props.item.item)
    mutate(subURI, { subscribed: false })
  }

  if (!subStatus) return <Spinner />

  return subStatus?.subscribed
    ? (
      <SubscribeButton
        colorScheme='unsubscribe'
        device={props.item.item}
        method={unsub}>
        Unsubscribe
      </SubscribeButton>
    )
    : (
      <SubscribeButton
        colorScheme="subscribe"
        device={props.item.item}
        method={sub}>
        Subscribe
      </SubscribeButton>
    )
}
