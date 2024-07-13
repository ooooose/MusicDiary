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
import { useState, type Dispatch, type SetStateAction } from 'react'

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
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = () => {
    setIsRetrying(true)
    onClick()
    setHasApiError(false)
    setTimeout(() => setIsRetrying(false), 2000) // 2-second delay before retrying
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
          <AlertDialogAction disabled={isRetrying} onClick={handleRetry}>
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
