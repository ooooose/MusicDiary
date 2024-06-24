import { getDiariesQueryOptions } from '@/features/diaries/api/get-diaries'
import { apiClient } from '@/lib/api/apiClient'
import type { MutationConfig } from '@/lib/react-query/react-query'
import type { Diary } from '@/types/api'
import { endpoints } from '@/utils/constants/endpoints'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { generateUUID } from '@/lib/uuid'
import { z } from 'zod'

export const createDiaryInputSchema = z.object({
  body: z.string().min(1, '入力必須です'),
})

export type CreateDiaryInput = z.infer<typeof createDiaryInputSchema>

export const createDiary = async (params: CreateDiaryInput): Promise<Diary> => {
  const uuid = generateUUID()
  const paramsWithUUID = { ...params, uid: uuid }

  return await apiClient
    .apiPost(endpoints.diaries, paramsWithUUID)
}

type UsePostDiaryOptions = {
  mutationConfig?: MutationConfig<typeof createDiary>
}

export const useCreateDiary = ({ mutationConfig }: UsePostDiaryOptions) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getDiariesQueryOptions().queryKey,
      })
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: createDiary,
  })
}
