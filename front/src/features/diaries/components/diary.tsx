'use client'

import { useDiary } from '@/features/diaries/api/get-diary'
import { LoadingDiary } from '@/features/diaries/components/loading-diary'
import { formatDateForDiary } from '@/lib/date'
import { TextWithLineBreaks } from '@/lib/text-with-line-breaks'
import { memo, useEffect } from 'react'
import { useSetMusicDialog } from '@/features/diaries/hooks'

type DiaryProps = {
  date: string
  diaryId: string
}

export const Diary = memo(({ date, diaryId }: DiaryProps) => {
  const { ModalDialog, openDialog } = useSetMusicDialog()
  const diaryQuery = useDiary({ diaryId })

  useEffect(() => {
    if (diaryQuery.data) {
      openDialog()
    }
  }, [openDialog, diaryQuery.data])
  
  if (diaryQuery.isLoading) return <LoadingDiary />
  return (
    <div className="flex w-full flex-col gap-4">
      {formatDateForDiary(new Date(date))} <br />
      <div className="h-[300px] w-full rounded-sm border p-2">
        <TextWithLineBreaks text={diaryQuery.data?.body ?? ''} />
      </div>
      <ModalDialog uid={diaryId} />
    </div>
  )
})

Diary.displayName = 'Diary'
