import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCreateMusic } from '@/features/music/api'
import type { FC } from 'react'
import { useCallback, useState } from 'react'

type DialogProps = {
  open: boolean
  onClose: (result: boolean) => void
  handleSetMusic: () => void
}

const _ModalDialog: FC<DialogProps> = ({ open, onClose, handleSetMusic }) => {
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
              handleSetMusic()
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

export const useSetMusicDialog = (uid: string) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [music, setMusic] = useState<string[]>([])
  const [hasApiError, setHasApiError] = useState<boolean>(false)
  
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
  
  const createDiaryMutation = useCreateMusic({
    mutationConfig: {
      onSuccess: async (data) => {
        setMusic(data.response)
      },
      onError: (error) => {
        console.log('error', error)
        setHasApiError(true)
      },
    },
  })
  
  const handleSetMusic = useCallback(() => {
    createDiaryMutation.mutate(uid)
  }, [createDiaryMutation, uid])

  const ModalDialog: FC<{ uid: string }> = () => (
    <_ModalDialog
      open={modalOpen}
      onClose={onClose}
      handleSetMusic={handleSetMusic}
    />
  )

  return {
    createDiaryMutation,
    music,
    ModalDialog,
    openDialog,
    handleSetMusic,
    setHasApiError,
    hasApiError
  }
}
