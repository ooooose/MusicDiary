'use client'

import { useState } from 'react'
import { useDiaries } from '@/features/diaries/api'
import { Skeleton } from '@/components/ui/skeleton'
import { Calendar } from '@/components/ui/calendar'

export const DiariesList = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const diariesQuery = useDiaries({})
  
  if (diariesQuery.isLoading) return <Skeleton className="h-[30px] w-[100px]" />
  if (!diariesQuery.data?.length) return <div>No Diaries!</div>
  return (
    <ul aria-label="diaries" className="flex flex-col space-y-3">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        diaries={diariesQuery.data}
        className="rounded-md border shadow"
      />
    </ul>
  )
}
