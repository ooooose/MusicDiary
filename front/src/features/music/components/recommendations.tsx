import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import ApiErrorAlert from '@/features/music/components/api-error-alert'
import { Track } from '@/features/music/components/track'
import { useSetMusicDialog } from '@/features/music/hooks'
import type { Track as TrackType } from '@/types/api'
import { Music } from 'lucide-react'

type RecommendationsProps = {
  diaryId: string
  tracks: TrackType[]
}

export const Recommendations = ({ diaryId, tracks }: RecommendationsProps) => {
  const {
    ModalDialog,
    createDiaryMutation,
    openDialog,
    handleSetMusic,
    setHasApiError,
    hasApiError,
  } = useSetMusicDialog(diaryId)

  return (
    <div className="flex flex-col">
      <Button
        className="ml-auto"
        onClick={() => openDialog()}
        disabled={createDiaryMutation.isPending}
        icon={<Music className="size-4" />}
      >
        音楽を取得
      </Button>
      <ModalDialog uid={diaryId} />
      <div className="mt-4 w-full">
        {createDiaryMutation.isPending && (
          <Spinner className="mx-auto text-center" size="lg" />
        )}
        {tracks.map((track, index) => (
          <div key={`${index}-${track.title}`}>
            <Track spotifyId={track.spotifyId}/> 
          </div>
        ))}
      </div>
      <ApiErrorAlert
        hasApiError={hasApiError}
        onClick={handleSetMusic}
        setHasApiError={setHasApiError}
      />
    </div>
  )
}
