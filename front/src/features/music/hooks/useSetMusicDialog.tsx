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
import type { UseMutationResult } from '@tanstack/react-query'
import type { FC } from 'react'
import { useCallback, useState } from 'react'

type DialogProps = {
  uid: string
  music: string[]
  open: boolean
  onClose: (result: boolean) => void
  onSetMusic: UseMutationResult<
    { response: string[] },
    Error,
    string,
    unknown
  >
}

const _ModalDialog: FC<DialogProps> = ({ uid, music, open, onClose, onSetMusic }) => {
  const handleSetMusic = useCallback(() => {
    onSetMusic.mutate(uid)
  }, [onSetMusic, uid])

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
          <Button onClick={handleSetMusic}>利用する！</Button>
          <Button variant='outline' onClick={() => onClose(false)}>閉じる</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const useSetMusicDialog = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [music, setMusic] = useState<string[]>([])

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
      },
    },
  })

  const ModalDialog: FC<{ uid: string }> = ({ uid }) => (
    <_ModalDialog
      uid={uid}
      open={modalOpen}
      onClose={onClose}
      music={music}
      onSetMusic={createDiaryMutation}
    />
  )

  return {
    createDiaryMutation,
    music,
    ModalDialog,
    openDialog,
  }
}
