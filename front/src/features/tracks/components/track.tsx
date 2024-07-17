import { memo, useRef } from 'react'

type TrackProps = {
  spotifyId: string
}

export const Track = memo(({ spotifyId }: TrackProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleGesture = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        'play',
        'https://open.spotify.com',
      )
    }
  }

  return (
    <div className="mb-2">
      <iframe
        ref={iframeRef}
        src={`https://open.spotify.com/embed/track/${spotifyId}`}
        width="100%"
        height="80"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        onClick={handleGesture}
      ></iframe>
    </div>
  )
})

Track.displayName = 'Track'
