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
  const router = useRouter()
  const deleteDiaryMutation = UseDeleteDiary({
    mutationConfig: {
      onSuccess: () => {
        console.log('success')
        router.push(`/diaries/${date}`)
      },
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
