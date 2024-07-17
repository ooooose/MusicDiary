import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import ApiErrorAlert from '@/features/tracks/components/api-error-alert'
import { DeleteTrack } from '@/features/tracks/components/delete-track'
import { Track } from '@/features/tracks/components/track'
import { useSetTrackDialog } from '@/features/tracks/hooks'
import type { Track as TrackType } from '@/types/api'
import { Music } from 'lucide-react'

type RecommendationsProps = {
  diaryId: string
  tracks: TrackType[]
}

export const Recommendations = ({ diaryId, tracks }: RecommendationsProps) => {
  const {
    ModalDialog,
    createTrackMutation,
    openDialog,
    handleSetTrack,
    setHasApiError,
    hasApiError,
  } = useSetTrackDialog(diaryId)

  return (
    <div className="flex flex-col">
      <Button
        className="ml-auto"
        onClick={() => openDialog()}
        disabled={createTrackMutation.isPending}
        icon={<Music className="size-4" />}
      >
        音楽を取得
      </Button>
      <ModalDialog uid={diaryId} />
      <div className="mt-4 w-full">
        {createTrackMutation.isPending && (
          <Spinner className="mx-auto text-center" size="lg" />
        )}
        {tracks.map((track, index) => (
          <div key={`${index}-${track.title}`} className='mb-4'>
            <Track spotifyId={track.spotifyId} />
            <div className="flex justify-end">
              <DeleteTrack trackId={track.id} diaryId={diaryId} />
            </div>
          </div>
        ))}
      </div>
      <ApiErrorAlert
        hasApiError={hasApiError}
        onClick={handleSetTrack}
        setHasApiError={setHasApiError}
      />
    </div>
  )
}
