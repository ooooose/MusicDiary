import { Button } from '@/components/ui/button'
import type { UpdateDiaryInput } from '@/features/diaries/api/update-diary'
import { Ban, Check, Pencil } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { memo, useCallback } from 'react'
import type { SubmitHandler, UseFormReturn } from 'react-hook-form'

type EditDiaryButtonProps = {
  editFlag: boolean
  setEditFlag: Dispatch<SetStateAction<boolean>>
  form: UseFormReturn<UpdateDiaryInput>
  onSubmit: SubmitHandler<UpdateDiaryInput>
}

const EditButton = memo(({ onClick }: { onClick: () => void }) => (
  <Button size="sm" onClick={onClick} icon={<Pencil className="size-4" />}>
    編集
  </Button>
))
EditButton.displayName = 'EditButton'

const UpdateButton = memo(({ onClick }: { onClick: () => void }) => (
  <Button size="sm" onClick={onClick} icon={<Check className="size-4" />}>
    更新
  </Button>
))
UpdateButton.displayName = 'UpdateButton'

const CancelButton = memo(({ onClick }: { onClick: () => void }) => (
  <Button size="sm" onClick={onClick} icon={<Ban className="size-4" />}>
    キャンセル
  </Button>
))
CancelButton.displayName = 'CancelButton'

export const EditDiaryButton = memo(
  ({ editFlag, setEditFlag, form, onSubmit }: EditDiaryButtonProps) => {
    const handleUpdate = useCallback(async () => {
      try {
        await form.handleSubmit(async (data) => {
          await onSubmit(data)
          setEditFlag(false)
        })()
      } catch (err) {
        console.error(err)
      }
    }, [form, onSubmit, setEditFlag])

    const handleCancel = useCallback(() => {
      setEditFlag(false)
      form.reset()
    }, [setEditFlag, form])

    const handleEdit = useCallback(() => setEditFlag(true), [setEditFlag])

    return (
      <div>
        <div className="flex gap-2">
          {editFlag ? (
            <>
              <UpdateButton onClick={handleUpdate} />
              <CancelButton onClick={handleCancel} />
            </>
          ) : (
            <EditButton onClick={handleEdit} />
          )}
        </div>
      </div>
    )
  },
)

EditDiaryButton.displayName = 'EditDiaryButton'
