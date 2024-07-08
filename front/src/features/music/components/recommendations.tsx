import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useSetMusicDialog } from '@/features/music/hooks'

type RecommendationsProps = {
  diaryId: string
}

export const Recommendations = ({ diaryId }: RecommendationsProps) => {
  const { ModalDialog, music, createDiaryMutation, openDialog } =
    useSetMusicDialog()

  return (
    <div className="flex flex-col">
      <Button
        className="ml-auto"
        onClick={() => openDialog()}
        disabled={createDiaryMutation.isPending}
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
    </div>
  )
}
