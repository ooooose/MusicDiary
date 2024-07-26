import type { Track } from '@/types/api'
import { createConsumer } from '@rails/actioncable'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

export function useActionCable(
  userId: number | undefined,
  setTracks: Dispatch<SetStateAction<Track[]>>,
) {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const consumer = createConsumer(
      `${process.env.NEXT_PUBLIC_WEBSOCKET_PROTOCOL}://${process.env.NEXT_PUBLIC_API_PORT}/cable`,
    )
    const sub = consumer.subscriptions.create(
      { channel: 'TrackChannel', user_id: userId },
      {
        connected() {
          setIsConnected(true)
        },
        disconnected() {
          setIsConnected(false)
        },
        received: (data) => {
          if (data.invalid) {
            console.error('invalid!')
            return
          }
          if (data.error) {
            console.error(data.error)
            return
          }
          setTracks(data.body)
        },
      },
    )

    return () => {
      sub.unsubscribe()
      consumer.disconnect()
    }
  }, [userId, setTracks])

  return { isConnected }
}
