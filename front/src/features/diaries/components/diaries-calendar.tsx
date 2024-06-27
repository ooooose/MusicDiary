'use client'

import { useState } from 'react'
import { useDiaries } from '@/features/diaries/api'
import { Skeleton } from '@/components/ui/skeleton'
import { Calendar } from '@/components/ui/calendar'

export const DiariesCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const diariesQuery = useDiaries({})
  
  if (diariesQuery.isLoading) return <Skeleton className="h-[350px] w-[400px]" />
  return (
    <div className='float-left'>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        diaries={diariesQuery.data ?? []}
        className="rounded-md border shadow"
      />
    </div>
  )
}
