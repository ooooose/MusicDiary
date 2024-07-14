'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import type { Dispatch, SetStateAction } from 'react'

type ApiErrorAlertProps = {
  hasApiError: boolean
  onClick: () => void
  setHasApiError: Dispatch<SetStateAction<boolean>>
}

export default function ApiErrorAlert({
  hasApiError,
  onClick,
  setHasApiError,
}: ApiErrorAlertProps) {
  const handleRetry = () => {
    onClick()
    setHasApiError(false)
  }

  const handleClose = () => {
    setHasApiError(false)
  }

  return (
    <AlertDialog open={hasApiError}>
      <AlertDialogContent>
        <AlertDialogTitle>楽曲の取得に失敗しました</AlertDialogTitle>
        <AlertDialogHeader>
          <AlertDialogDescription className="text-left">
            申し訳ございません。楽曲の提供に失敗しました。
            <br />
            再度お試しいただくか、文章を修正してからお試しください。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col gap-4 sm:flex-row sm:gap-0">
          <AlertDialogAction onClick={handleRetry}>
            再リクエスト
          </AlertDialogAction>
          <AlertDialogCancel onClick={handleClose}>
            キャンセル
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
