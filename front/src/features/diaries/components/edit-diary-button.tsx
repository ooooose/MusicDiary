import { Button } from '@/components/ui/button'
import { Ban, Check } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

type EditDiaryButtonProps = {
  editFlag: boolean
  setEditFlag: Dispatch<SetStateAction<boolean>>
}

export const EditDiaryButton = ({
  editFlag,
  setEditFlag,
}: EditDiaryButtonProps) => {
  return (
    <div>
      {editFlag ? (
        <div>
          <Button
            onClick={() => {
              setEditFlag(false)
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
