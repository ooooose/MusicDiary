import { getDiaryQueryOptions } from '@/features/diaries/api'
import { apiClient } from '@/lib/api/api-client'
import type { MutationConfig } from '@/lib/react-query/react-query'
import type { Track } from '@/types/api'
import { endpoints } from '@/utils/constants/endpoints'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const createTrack = async (
  uid: string,
): Promise<{ response: Track }> => {
  return await apiClient.apiPost(endpoints.set_music(uid))
}

type UsePostTrackOptions = {
  diaryId: string
  mutationConfig?: MutationConfig<typeof createTrack>
}

export const useCreateTrack = ({ diaryId, mutationConfig }: UsePostTrackOptions) => {
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
    mutationFn: createTrack,
  })
}
