'use client'

import { memo } from 'react'
import { useDairyDiaries } from '@/features/diaries/api'
import Link from 'next/link'
import { LoadingDiaries } from '@/features/diaries/components/loading-diaries'
import { NoDiaries } from '@/features/diaries/components/no-diaries'
import { formatDateForDiary } from '@/lib/date'

type DiariesListProps = {
  date: string
}

export const DairyDiariesList = memo(({ date }: DiariesListProps) => {
  const dairydiariesQuery = useDairyDiaries({ date })
  const formatDate = formatDateForDiary(new Date(date))

  if (dairydiariesQuery.isLoading) return <LoadingDiaries />
  if (!dairydiariesQuery.data?.length) return <NoDiaries date={formatDate} />
  return (
    <div>
      <p>{formatDate}</p>
      <ul aria-label="diaries" className="flex flex-col space-y-3">
        {dairydiariesQuery?.data?.map((diary, index) => (
          <Link key={diary.id || index} href={`/diaries/${date}/${diary.uid}`}>
            <li
              aria-label={`diary-${diary.body}-${index}`}
              className="w-full p-4 shadow-sm"
            >
              {index + 1}
              {diary.body}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
})

DairyDiariesList.displayName = 'DairyDiariesList'