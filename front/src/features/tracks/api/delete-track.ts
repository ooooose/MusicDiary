import { apiClient } from '@/lib/api/api-client'
import type { MutationConfig } from '@/lib/react-query/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { getDiaryQueryOptions } from '@/features/diaries/api'
import { endpoints } from '@/utils/constants/endpoints'

export const deleteTrack = ({ track_id }: { track_id: number }) => {
  return apiClient.apiDelete(`${endpoints.tracks}/${track_id}`)
}

type UseDeleteTrackOptions = {
  diaryId: string
  mutationConfig?: MutationConfig<typeof deleteTrack>
}

export const UseDeleteTrack = ({ diaryId, mutationConfig }: UseDeleteTrackOptions) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getDiaryQueryOptions(diaryId).queryKey,
      })
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: deleteTrack,
  })
}
