import { Button } from '@/components/ui/button'
import type { UpdateDiaryInput } from '@/features/diaries/api/update-diary'
import { Ban, Check, Pencil } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import type { SubmitHandler, UseFormReturn } from 'react-hook-form'

type EditDiaryButtonProps = {
  editFlag: boolean
  setEditFlag: Dispatch<SetStateAction<boolean>>
  form: UseFormReturn<{
    body: string
  }>
  onSubmit: SubmitHandler<UpdateDiaryInput>
}

export const EditDiaryButton = ({
  editFlag,
  setEditFlag,
  form,
  onSubmit,
}: EditDiaryButtonProps) => {
  return (
    <div>
      {editFlag ? (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              form.handleSubmit(onSubmit)()
              setEditFlag(false)
            }}
            icon={<Check className="sizew-4" />}
            size="sm"
          >
            更新
          </Button>
          <Button
            onClick={() => {
              setEditFlag(false)
              form.reset()
            }}
            icon={<Ban className="size-4" />}
            size="sm"
          >
            キャンセル
          </Button>
        </div>
      ) : (
        <Button size="sm" onClick={() => setEditFlag(true)}
          icon={<Pencil className='size-4' />}
        >
          編集
        </Button>
      )}
    </div>
  )
}
