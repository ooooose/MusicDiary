'use client'
import { useDiaries } from '@/features/diaries/api'

export const DiariesList = () => {
  const diariesQuery = useDiaries({})

  if (diariesQuery.isLoading) return <div>loading...</div>
  if (!diariesQuery?.data?.length) return <div>No Diaries!</div>

  return (
    <ul aria-label="comments" className="flex flex-col space-y-3">
      {diariesQuery.data.map((diary, index) => (
        <li
          aria-label={`diary-${diary.body}-${index}`}
          key={diary.id || index}
          className="w-full bg-white p-4 shadow-sm"
        >
          {diary.id}
        </li>
      ))}
    </ul>
  )
}
