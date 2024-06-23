import { apiClient } from "@/lib/api/apiClient"
import { endpoints } from "@/utils/constants/endpoints"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { MutationConfig } from '@/lib/react-query/react-query'
import type { Diary } from "@/types/api"
import { getDiariesQueryOptions } from "@/features/diaries/api/get-diaries"
import { z } from 'zod'

export const createDiaryInputSchema = z.object({
  body: z.string().min(1, '入力必須です'),
})

export type CreateDiaryInput = z.infer<typeof createDiaryInputSchema>

export const createDiary = async (params: CreateDiaryInput): Promise<Diary> => {
  return await apiClient
    .apiPost(endpoints.diaries, params)
    .then((result) => result.json())
}

type UsePostDiaryOptions = {
  mutationConfig?: MutationConfig<typeof createDiary>
}

export const useCreateDiary = ({
  mutationConfig,
}: UsePostDiaryOptions) => {
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
