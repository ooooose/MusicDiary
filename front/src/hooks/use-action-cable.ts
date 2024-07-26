import type { Subscription } from '@rails/actioncable'
import { createConsumer } from '@rails/actioncable'
import { useEffect, useState } from 'react'

export function useActionCable(
  channel: string,
  params: object = {},
  received: (data: any) => void,
) {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  useEffect(() => {
    const consumer = createConsumer(
      `${process.env.NEXT_PUBLIC_WEBSOCKET_PROTOCOL}://${process.env.NEXT_PUBLIC_API_PORT}/cable`,
    )
    const sub = consumer.subscriptions.create(
      { channel, ...params },
      {
        received
      },
    )

    setSubscription(sub)

    return () => {
      sub.unsubscribe()
      consumer.disconnect()
    }
  }, [channel, params, received])

  return subscription
}
