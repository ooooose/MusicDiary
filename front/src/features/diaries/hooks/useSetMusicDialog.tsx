import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { FC } from 'react'
import { useCallback, useState } from 'react'

type DialogProps = {
  open: boolean
  onClose: (result: boolean) => void
}

const _ModalDialog: FC<DialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={() => onClose(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>今日も一日お疲れ様でした！</DialogTitle>
          <DialogDescription>
            日記からおすすめの音楽を提供できます。利用しますか？
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onClose(false)}>閉じる</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const useSetMusicDialog = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const [resolve, setResolve] = useState<(result: boolean) => void>(
    () => () => {},
  )

  const openDialog = useCallback((): Promise<boolean> => {
    setModalOpen(true)
    return new Promise<boolean>((resolve) => {
      setResolve(() => resolve)
    })
  }, [])

  const onClose = useCallback(
    (result: boolean) => {
      setModalOpen(false)
      if (resolve) {
        resolve(result)
      }
    },
    [resolve],
  )

  const ModalDialog = () => <_ModalDialog open={modalOpen} onClose={onClose} />

  return {
    ModalDialog,
    openDialog,
  }
}
