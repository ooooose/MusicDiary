'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useDairyDiaries } from '@/features/diaries/api'

type DiariesListProps = {
  date: string
}

export const DiariesList = ({ date }: DiariesListProps) => {
  const dairydiariesQuery = useDairyDiaries({ date })

  if (dairydiariesQuery.isLoading)
    return <Skeleton className="h-[350px] w-[400px]" />
  if (!dairydiariesQuery.data?.length) return <div>No Diaries!</div>
  return (
    <ul aria-label="diaries" className="flex flex-col space-y-3">
      {dairydiariesQuery?.data?.map((diary, index) => (
        <li
          aria-label={`diary-${diary.body}-${index}`}
          key={diary.id || index}
          className="w-full p-4 shadow-sm"
        >
          {diary.id}
        </li>
      ))}
    </ul>
  )
}
