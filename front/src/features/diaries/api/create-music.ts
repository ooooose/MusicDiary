import { getDiariesQueryOptions } from '@/features/diaries/api/get-diaries'
import { apiClient } from '@/lib/api/api-client'
import type { MutationConfig } from '@/lib/react-query/react-query'
import { endpoints } from '@/utils/constants/endpoints'
import { useMutation, useQueryClient } from '@tanstack/react-query'


export const createMusic = async (
  uid: string,
): Promise<{ response: string[] }> => {
  return await apiClient.apiPost(endpoints.set_music(uid))
}

type UsePostMusicOptions = {
  mutationConfig?: MutationConfig<typeof createMusic>
}

export const useCreateMusic = ({ mutationConfig }: UsePostMusicOptions) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getDiariesQueryOptions().queryKey,
      })
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: createMusic,
  })
}
