import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import ApiErrorAlert from '@/features/music/components/api-error-alert'
import { useSetMusicDialog } from '@/features/music/hooks'
import { Music } from 'lucide-react'

type RecommendationsProps = {
  diaryId: string
}

export const Recommendations = ({ diaryId }: RecommendationsProps) => {
  const {
    ModalDialog,
    music,
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
        {music &&
          music.map((m, i) => (
            <li key={i} className="w-full p-4 shadow-sm">
              {m}
            </li>
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
