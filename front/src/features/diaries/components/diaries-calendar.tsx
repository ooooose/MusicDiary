'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useDiaries } from '@/features/diaries/api'
import { Skeleton } from '@/components/ui/skeleton'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'

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

      <Button variant='outline' className='mt-4 w-full'>
        <Link href='/diaries'>
          日記を作成する
        </Link>
      </Button>
    </div>
  )
}
