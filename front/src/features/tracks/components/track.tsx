import { memo, useCallback, useRef } from 'react'

type TrackProps = {
  spotifyId: string
}

export const Track = memo(({ spotifyId }: TrackProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleLoad = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.setAttribute(
        'allow',
        'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
      )
    }
  }, [])

  return (
    <div className="mb-2">
      <iframe
        ref={iframeRef}
        src={`https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator`}
        width="100%"
        height="80"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={`Spotify track ${spotifyId}`}
        onLoad={handleLoad}
      ></iframe>
    </div>
  )
})

Track.displayName = 'Track'
