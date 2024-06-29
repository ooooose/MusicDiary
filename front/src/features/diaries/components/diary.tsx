'use client'

import { useDiary } from '@/features/diaries/api/get-diary'
import { LoadingDiary } from '@/features/diaries/components/loading-diary'
import { TextWithLineBreaks } from '@/lib/text-with-line-breaks'
import { formatDateForDiary } from '@/lib/date'

type DiaryProps = {
  date: string
  diaryId: string
}

export const Diary = ({ date, diaryId }: DiaryProps) => {
  const diaryQuery = useDiary({ diaryId })
  if (diaryQuery.isLoading) return <LoadingDiary />
  return (
    <div className="flex w-full flex-col gap-4">
      {formatDateForDiary(new Date(date))} <br />
      <div className="h-[300px] w-full rounded-sm border p-2">
        <TextWithLineBreaks text={diaryQuery.data?.body ?? ''} />
      </div>
    </div>
  )
}
