'use client'

import { useDiary } from "@/features/diaries/api/get-diary"
import { Skeleton } from "@/components/ui/skeleton"

type DiaryProps = {
  date: string
  diaryId: string
}

export const Diary = ({ date, diaryId }: DiaryProps) => {
  const diaryQuery = useDiary({ diaryId })
  if (diaryQuery.isLoading) return <Skeleton className="h-[350px] w-[400px]" />

  return (
    <div className="w-full">
      {date} <br />
      {diaryQuery.data?.body}
    </div>
  )
}