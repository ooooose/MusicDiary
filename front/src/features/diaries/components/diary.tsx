'use client'

import { useDiary } from '@/features/diaries/api/get-diary'
import { DeleteDiary } from '@/features/diaries/components/delete-diary'
import { LoadingDiary } from '@/features/diaries/components/loading-diary'
import { Recommendations } from '@/features/music/components/recommendations'
import { formatDateForDiary } from '@/lib/date'
import { TextWithLineBreaks } from '@/lib/text-with-line-breaks'
import { memo } from 'react'

type DiaryProps = {
  date: string
  diaryId: string
}

export const Diary = memo(({ date, diaryId }: DiaryProps) => {
  const diaryQuery = useDiary({ diaryId })

  if (diaryQuery.isLoading) return <LoadingDiary />
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="space-between flex">
        <p className="w-full">{formatDateForDiary(new Date(date))}</p>
        <div className="w-full text-right">
          <DeleteDiary id={diaryId} date={date} />
        </div>
      </div>
      <div className="h-[300px] w-full rounded-sm border p-2">
        <TextWithLineBreaks text={diaryQuery.data?.body ?? ''} />
      </div>
      <div className="mt-2 w-full">
        <Recommendations diaryId={diaryId} />
      </div>
    </div>
  )
})

Diary.displayName = 'Diary'
