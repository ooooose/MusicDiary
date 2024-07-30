import { createConsumer } from '@rails/actioncable'
import { useEffect } from 'react'

export const useWebsocketConnection = (userId: number | undefined, onRecieve: (data: any) => void) => {
  useEffect(()=> {
    const cable = createConsumer(
      `${process.env.NEXT_PUBLIC_WEBSOCKET_PROTOCOL}://${process.env.NEXT_PUBLIC_API_PORT}/cable`,
    )
    const subscription = cable.subscriptions.create(
      {channel: "TrackChannel", user_id: userId},
      {received: onRecieve}
    )

    return () => {
      subscription.unsubscribe()
      cable.disconnect()
    }
  }, [userId, onRecieve])
}
