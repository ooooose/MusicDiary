'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Skeleton } from '@/components/ui/skeleton'
import { useDiaries } from '@/features/diaries/api'
import Link from 'next/link'
import { useState } from 'react'

export const DiariesCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const diariesQuery = useDiaries({})

  if (diariesQuery.isLoading)
    return (
      <div className="w-[400px]">
        <Skeleton className="h-[350px] w-full" />
        <Skeleton className="mt-4 h-[40px] w-full" />
      </div>
    )
  return (
    <div className="float-left">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        diaries={diariesQuery.data ?? []}
        className="rounded-md border shadow"
      />

      <Button variant="outline" className="mt-4 w-full">
        <Link href="/diaries">日記を作成する</Link>
      </Button>
    </div>
  )
}
