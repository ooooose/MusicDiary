import { useNotifications } from '@/components/atoms/notifications'
import { Button } from '@/components/ui/button'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'
import { UseDeleteDiary } from '@/features/diaries/api/delete-diary'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'

type DeleteDiaryProps = {
  id: string
  date: string
}

export const DeleteDiary = ({ id, date }: DeleteDiaryProps) => {
  const { addNotification } = useNotifications()
  const router = useRouter()
  const deleteDiaryMutation = UseDeleteDiary({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: '日記を削除しました',
        })
        router.push(`/diaries/${date}`)
      },
      onError: () => {
        addNotification({
          type: 'error',
          title: '日記を削除できませんでした'
        })
      }
    },
  })

  return (
    <ConfirmationDialog
      isDone={deleteDiaryMutation.isSuccess}
      icon="danger"
      title="日記を削除します"
      body="本当に日記を削除してよろしいですか？"
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
          isLoading={deleteDiaryMutation.isPending}
          type="button"
          variant="destructive"
          onClick={() => deleteDiaryMutation.mutate({ diary_id: id })}
        >
          削除する
        </Button>
      }
    />
  )
}
