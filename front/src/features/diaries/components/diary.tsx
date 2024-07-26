'use client'

import { memo, useCallback, useEffect, useState } from 'react'
import { useNotifications } from '@/components/notifications'
import { useDiary } from '@/features/diaries/api/get-diary'
import type { UpdateDiaryInput } from '@/features/diaries/api/update-diary'
import {
  updateDiaryInputSchema,
  useUpdateDiary,
} from '@/features/diaries/api/update-diary'
import { DeleteDiary } from '@/features/diaries/components/delete-diary'
import { EditDiary } from '@/features/diaries/components/edit-diary'
import { EditDiaryButton } from '@/features/diaries/components/edit-diary-button'
import { LoadingDiary } from '@/features/diaries/components/loading-diary'
import { Recommendations } from '@/features/tracks/components/recommendations'
import { useActionCable } from '@/hooks/use-action-cable'
import { formatDateForDiary } from '@/lib/date'
import { TextWithLineBreaks } from '@/lib/text-with-line-breaks'
import { zodResolver } from '@hookform/resolvers/zod'

import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import type { Track } from '@/types/api'

type DiaryProps = {
  date: string
  diaryId: string
}

const DiaryHeader = memo(
  ({ date, children }: { date: string; children: React.ReactNode }) => (
    <div className="space-between flex">
      <p className="w-full">{formatDateForDiary(new Date(date))}</p>
      <div className="flex justify-end space-x-2">{children}</div>
    </div>
  ),
)
DiaryHeader.displayName = 'DiaryHeader'

const DiaryContent = memo(({ body }: { body: string }) => (
  <div className="h-[300px] w-full rounded-sm border p-2">
    <TextWithLineBreaks text={body} />
  </div>
))
DiaryContent.displayName = 'DiaryContent'

export const Diary = memo(({ date, diaryId }: DiaryProps) => {
  const { addNotification } = useNotifications()
  const diaryQuery = useDiary({ diaryId })
  const [editFlag, setEditFlag] = useState<boolean>(false)
  const updateDiaryMutation = useUpdateDiary({
    diaryId,
    mutationConfig: {
      onSuccess: async () => {
        addNotification({
          type: 'success',
          title: '日記を更新しました',
        })
      },
      onError: () => {
        addNotification({
          type: 'error',
          title: '日記を更新できませんでした',
        })
      },
    },
  })

  const form = useForm<UpdateDiaryInput>({
    resolver: zodResolver(updateDiaryInputSchema),
    mode: 'onSubmit',
  })

  useEffect(() => {
    if (diaryQuery.data) {
      form.reset({ body: diaryQuery.data.body })
    }
  }, [diaryQuery.data, form])

  const [tracks, setTracks] = useState<Track[]>(diaryQuery.data?.tracks ?? [])

  const onSubmit = useCallback<SubmitHandler<UpdateDiaryInput>>(
    (values) => {
      updateDiaryMutation.mutate({
        diaryId,
        data: { body: values.body },
      })
    },
    [updateDiaryMutation, diaryId],
  )

  const { isConnected } = useActionCable(diaryQuery.data?.userId, setTracks)

  if (diaryQuery.isLoading) return <LoadingDiary />

  return (
    <div className="flex w-full flex-col gap-4">
      {isConnected && <div>WebSocket Connected</div>}
      <DiaryHeader date={date}>
        <EditDiaryButton
          editFlag={editFlag}
          setEditFlag={setEditFlag}
          form={form}
          onSubmit={onSubmit}
        />
        <DeleteDiary id={diaryId} date={date} />
      </DiaryHeader>
      {editFlag ? (
        <EditDiary form={form} onSubmit={onSubmit} />
      ) : (
        <DiaryContent body={diaryQuery.data?.body ?? ''} />
      )}
      <div className="mt-2 w-full">
        <Recommendations tracks={tracks} />
      </div>
    </div>
  )
})

Diary.displayName = 'Diary'
