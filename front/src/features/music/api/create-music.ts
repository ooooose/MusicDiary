import { getDiaryQueryOptions } from '@/features/diaries/api'
import { apiClient } from '@/lib/api/api-client'
import type { MutationConfig } from '@/lib/react-query/react-query'
import type { Track } from '@/types/api'
import { endpoints } from '@/utils/constants/endpoints'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const createMusic = async (
  uid: string,
): Promise<{ response: Track }> => {
  return await apiClient.apiPost(endpoints.set_music(uid))
}

type UsePostMusicOptions = {
  diaryId: string
  mutationConfig?: MutationConfig<typeof createMusic>
}

export const useCreateMusic = ({
  diaryId,
  mutationConfig,
}: UsePostMusicOptions) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getDiaryQueryOptions(diaryId).queryKey,
      })
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: createMusic,
  })
}
