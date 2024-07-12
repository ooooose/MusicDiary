import { Button } from '@/components/ui/button'
import type { UpdateDiaryInput } from '@/features/diaries/api/update-diary'
import { Ban, Check, Pencil } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import type { SubmitHandler, UseFormReturn } from 'react-hook-form'

type EditDiaryButtonProps = {
  editFlag: boolean
  setEditFlag: Dispatch<SetStateAction<boolean>>
  form: UseFormReturn<UpdateDiaryInput>
  onSubmit: SubmitHandler<UpdateDiaryInput>
}

const EditButton = ({ onClick }: { onClick: () => void }) => (
  <Button size="sm" onClick={onClick} icon={<Pencil className="size-4" />}>
    編集
  </Button>
)

const UpdateButton = ({ onClick }: { onClick: () => void }) => (
  <Button size="sm" onClick={onClick} icon={<Check className="size-4" />}>
    更新
  </Button>
)

const CancelButton = ({ onClick }: { onClick: () => void }) => (
  <Button size="sm" onClick={onClick} icon={<Ban className="size-4" />}>
    キャンセル
  </Button>
)

export const EditDiaryButton = ({
  editFlag,
  setEditFlag,
  form,
  onSubmit,
}: EditDiaryButtonProps) => {

  const handleUpdate = async () => {
    try {
      const result = await form.handleSubmit(onSubmit)()
      if (result === undefined) {
        return
      }
      setEditFlag(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleCancel = () => {
    setEditFlag(false)
    form.reset()
  }

  return (
    <div>
      <div className="flex gap-2">
        {editFlag ? (
          <>
            <UpdateButton onClick={handleUpdate} />
            <CancelButton onClick={handleCancel} />
          </>
        ) : (
          <EditButton onClick={() => setEditFlag(true)} />
        )}
      </div>
    </div>
  )
}
