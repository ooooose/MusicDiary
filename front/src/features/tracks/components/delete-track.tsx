import { useNotifications } from '@/components/notifications'
import { Button } from '@/components/ui/button'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'
import { UseDeleteTrack } from '@/features/tracks/api/delete-track'
import { Trash } from 'lucide-react'

type DeleteTrackProps = {
  diaryId: string
  trackId: number
}

export const DeleteTrack = ({ diaryId, trackId }: DeleteTrackProps) => {
  const { addNotification } = useNotifications()
  const deleteTrackMutation = UseDeleteTrack({
    diaryId,
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: '楽曲を削除しました',
        })
      },
      onError: () => {
        addNotification({
          type: 'error',
          title: '楽曲を削除できませんでした',
        })
      },
    },
  })

  return (
    <ConfirmationDialog
      isDone={deleteTrackMutation.isSuccess}
      icon="danger"
      title="楽曲を削除します"
      body="本当に楽曲を削除してよろしいですか？"
      triggerButton={
        <Button
          variant="destructive"
          size="sm"
          icon={<Trash className="size-4" />}
        >
          削除
        </Button>
      }
      confirmButton={
        <Button
          isLoading={deleteTrackMutation.isPending}
          type="button"
          variant="destructive"
          onClick={() => deleteTrackMutation.mutate({ trackId })}
        >
          削除
        </Button>
      }
    />
  )
}
