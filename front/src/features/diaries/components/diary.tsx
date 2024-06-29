'use client'

import { useDiary } from "@/features/diaries/api/get-diary"
import { LoadingDiary } from "@/features/diaries/components/loading-diary"

type DiaryProps = {
  date: string
  diaryId: string
}

export const Diary = ({ date, diaryId }: DiaryProps) => {
  const diaryQuery = useDiary({ diaryId })
  if (diaryQuery.isLoading) return <LoadingDiary />

  return (
    <div className="w-full">
      {date} <br />
      {diaryQuery.data?.body}
    </div>
  )
}