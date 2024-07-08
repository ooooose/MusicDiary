import { Button } from '@/components/ui/button'
import { LoadingMusic } from '@/features/music/components/loading-music'
import { useSetMusicDialog } from '@/features/music/hooks'

type RecommendationsProps = {
  diaryId: string
}

export const Recommendations = ({ diaryId }: RecommendationsProps) => {
  const { ModalDialog, music, createDiaryMutation, openDialog } = useSetMusicDialog()

  return (
    <div className="w-full">
      <Button className="float-right" onClick={() => openDialog()}>
        音楽を取得
      </Button>
      <ModalDialog uid={diaryId} />
      {createDiaryMutation.isPending && <LoadingMusic />}
      {music &&
        music.map((m, i) => (
          <li key={i} className="w-full p-4 shadow-sm">
            {m}
          </li>
        ))}
    </div>
  )
}
