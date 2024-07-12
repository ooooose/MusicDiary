'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Skeleton } from '@/components/ui/skeleton'
import { useDiaries } from '@/features/diaries/api'
import { Notebook } from 'lucide-react'
import Link from 'next/link'
import { memo, useCallback, useState } from 'react'

const CreateDiaryButton = memo(() => (
  <Link href="/diaries" passHref legacyBehavior>
    <Button
      variant="default"
      className="mt-4 w-full"
      icon={<Notebook className="size-4" />}
    >
      日記を作成する
    </Button>
  </Link>
))
CreateDiaryButton.displayName = 'CreateDiaryButton'

export const DiariesCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const diariesQuery = useDiaries({})

  const handleDateSelect = useCallback((newDate: Date | undefined) => {
    setDate(newDate)
  }, [])

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
        onSelect={handleDateSelect}
        diaries={diariesQuery.data ?? []}
        className="rounded-md border shadow"
      />
      <CreateDiaryButton />
    </div>
  )
}
