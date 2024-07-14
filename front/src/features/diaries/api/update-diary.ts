import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { apiClient } from '@/lib/api/api-client'
import type { MutationConfig } from '@/lib/react-query/react-query'
import type { Diary } from '@/types/api'

import { getDiaryQueryOptions } from '@/features/diaries/api/get-diary'
import { endpoints } from '@/utils/constants/endpoints'

export const updateDiaryInputSchema = z.object({
  body: z.string().min(1, '入力必須です'),
})

export type UpdateDiaryInput = z.infer<typeof updateDiaryInputSchema>

export const updateDiary = async ({
  data,
  diaryId,
}: {
  data: UpdateDiaryInput
  diaryId: string
}): Promise<Diary> => {
  return await apiClient.apiPut(`${endpoints.diaries}/${diaryId}`, data)
}

type UseUpdateDiaryOptions = {
  diaryId: string
  mutationConfig?: MutationConfig<typeof updateDiary>
}

export const useUpdateDiary = ({
  diaryId,
  mutationConfig,
}: UseUpdateDiaryOptions) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getDiaryQueryOptions(diaryId).queryKey,
      })
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: updateDiary,
  })
}
