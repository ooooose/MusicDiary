'use client'

import type { Dispatch, SetStateAction } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCancel
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

type ApiErrorAlertProps = {
  hasApiError: boolean
  onClick: () => void
  setHasApiError: Dispatch<SetStateAction<boolean>>
}

export default function ApiErrorAlert({ hasApiError, onClick, setHasApiError }: ApiErrorAlertProps) {
  return (
    <AlertDialog open={hasApiError}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription className="text-left">
            申し訳ございません。楽曲の提供に失敗しました。
            <br />
            再度お試しいただくか、文章を修正してからお試しください。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col gap-4 sm:flex-row sm:gap-0">
          <Button onClick={onClick}>再リクエスト</Button>
          <AlertDialogCancel onClick={() => setHasApiError(false)}>
            キャンセル
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
