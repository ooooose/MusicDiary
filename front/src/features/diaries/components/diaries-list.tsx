'use client'

import { useDiaries } from '@/features/diaries/api'
import { Skeleton } from '@/components/ui/skeleton'

export const DiariesList = () => {
  const diariesQuery = useDiaries({})
  
  console.log(diariesQuery)
  if (diariesQuery.isLoading) return <Skeleton className="h-[30px] w-[100px]" />
  if (!diariesQuery.data?.length) return <div>No Diaries!</div>
  return (
    <ul aria-label="diaries" className="flex flex-col space-y-3">
      {diariesQuery?.data?.map((diary, index) => (
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
