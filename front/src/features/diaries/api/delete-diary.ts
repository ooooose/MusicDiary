import { apiClient } from '@/lib/api/api-client'
import type { MutationConfig } from '@/lib/react-query/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { getDiariesQueryOptions } from '@/features/diaries/api/get-diaries'
import { endpoints } from '@/utils/constants/endpoints'

export const deleteDiary = ({ diary_id }: { diary_id: string }) => {
  return apiClient.apiDelete(`${endpoints.diaries}/${diary_id}`)
}

type UseDeleteDiaryOptions = {
  mutationConfig?: MutationConfig<typeof deleteDiary>
}

export const UseDeleteDiary = ({ mutationConfig }: UseDeleteDiaryOptions) => {
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
    mutationFn: deleteDiary,
  })
}
