import { useNotifications } from '@/components/notifications'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCreateTrack } from '@/features/track/api'
import type { FC } from 'react'
import { useCallback, useState } from 'react'

type DialogProps = {
  open: boolean
  onClose: (result: boolean) => void
  handleSetTrack: () => void
}

const _ModalDialog: FC<DialogProps> = ({ open, onClose, handleSetTrack }) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>今日も一日お疲れ様でした！</DialogTitle>
          <DialogDescription>
            日記からおすすめの音楽を提供できます。利用しますか？
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => {
              handleSetTrack()
              onClose(false)
            }}
          >
            利用する！
          </Button>
          <Button variant="outline" onClick={() => onClose(false)}>
            閉じる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const useSetTrackDialog = (uid: string) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [hasApiError, setHasApiError] = useState<boolean>(false)
  const { addNotification } = useNotifications()

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

  const createTrackMutation = useCreateTrack({
    diaryId: uid,
    mutationConfig: {
      onSuccess: async () => {
        addNotification({
          type: 'success',
          title: '楽曲を取得しました',
        })
      },
      onError: () => {
        setHasApiError(true)
      },
    },
  })

  const handleSetTrack = useCallback(() => {
    createTrackMutation.mutate(uid)
  }, [createTrackMutation, uid])

  const ModalDialog: FC<{ uid: string }> = () => (
    <_ModalDialog
      open={modalOpen}
      onClose={onClose}
      handleSetTrack={handleSetTrack}
    />
  )

  return {
    createTrackMutation,
    ModalDialog,
    openDialog,
    handleSetTrack,
    setHasApiError,
    hasApiError,
  }
}
