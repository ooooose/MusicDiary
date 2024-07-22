import { Track } from '@/features/tracks/components/track'
import type { Track as TrackType } from '@/types/api'

type RecommendationsProps = {
  tracks: TrackType[]
}

export const Recommendations = ({ tracks }: RecommendationsProps) => {
  return (
    <div className="flex flex-col">
      {tracks.map((track, index) => (
        <div key={`${index}-${track.title}`} className='mb-4'>
          <Track spotifyId={track.spotifyId} />
        </div>
      ))}
    </div>
  )
}
