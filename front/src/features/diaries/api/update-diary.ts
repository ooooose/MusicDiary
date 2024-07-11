import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import type { Diary } from '@/types/api'
import { apiClient } from '@/lib/api/api-client'
import type { MutationConfig } from '@/lib/react-query/react-query'

import { endpoints } from '@/utils/constants/endpoints'
import { getDiariesQueryOptions } from '@/features/diaries/api/get-diaries'

export const updateDiaryInputSchema = z.object({
  body: z.string().min(1, '入力必須です'),
})

export type UpdateDiaryInput = z.infer<typeof updateDiaryInputSchema>

export const updateDiary = async ({
  data,
  diaryId
}: {
  data: UpdateDiaryInput,
  diaryId: string
}): Promise<Diary> => {
  return await apiClient.apiPut(`${endpoints.diaries}/${diaryId}`, data)
}

type UseUpdateDiaryOptions = {
  mutationConfig?: MutationConfig<typeof updateDiary>
}

export const useUpdateDiary = ({
  mutationConfig,
}: UseUpdateDiaryOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getDiariesQueryOptions().queryKey,
      })
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: updateDiary,
  })
}