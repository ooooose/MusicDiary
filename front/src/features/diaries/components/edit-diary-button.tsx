import { Button } from '@/components/ui/button'
import type { UpdateDiaryInput } from '@/features/diaries/api/update-diary'
import { Ban, Check } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import type { SubmitHandler, UseFormReturn } from 'react-hook-form'

type EditDiaryButtonProps = {
  editFlag: boolean
  setEditFlag: Dispatch<SetStateAction<boolean>>
  form: UseFormReturn<
    {
      body: string
    },
    any,
    undefined
  >
  onSubmit: SubmitHandler<UpdateDiaryInput>
}

export const EditDiaryButton = ({
  editFlag,
  setEditFlag,
  form,
  onSubmit
}: EditDiaryButtonProps) => {
  return (
    <div>
      {editFlag ? (
        <div>
          <Button
            onClick={() => {
              setEditFlag(false)
              form.handleSubmit(onSubmit)
            }}
            icon={<Check className="sizew-4" />}
          >
            更新
          </Button>
          <Button
            onClick={() => setEditFlag(false)}
            icon={<Ban className="size-4" />}
          >
            キャンセル
          </Button>
        </div>
      ) : (
        <Button onClick={() => setEditFlag(true)}>編集する</Button>
      )}
    </div>
  )
}
