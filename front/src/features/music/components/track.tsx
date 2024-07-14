type TrackProps = {
  spotifyId: string
}

export const Track = ({ spotifyId }: TrackProps) => {
  return (
    <div className="flex items-center md:flex-row">
      <iframe
        src={`https://open.spotify.com/embed/track/${spotifyId}`}
        width="100%"
        height="80"
        allowTransparency={true}
        allow="encrypted-media"
      ></iframe>
    </div>
  )
}
