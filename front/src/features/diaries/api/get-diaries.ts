import type { Diary } from '@/features/diaries/types'
import { apiClient } from '@/lib/api/apiClient'
import { endpoints } from '@/utils/constants/endpoints'
import { queryOptions, useQuery } from '@tanstack/react-query'
import type { QueryConfig } from '@/lib/react-query/react-query'

export const getDiary = async (id: string) => {
  return apiClient.apiGet(`${endpoints.DIARIES}/${id}`).then((res) => res.json())
}

export const getDiaries = (): Promise<Diary[]> => {
  return apiClient.apiGet(endpoints.DIARIES)
}

export const getDiariesQueryOptions = () => {
  return queryOptions({
    queryKey: ['diaries'],
    queryFn: () => getDiaries(),
  });
}

type UseDiariesOptions = {
  queryConfig?: QueryConfig<typeof getDiaries>
}

export const useComments = ({
  queryConfig,
}: UseDiariesOptions) => {
  return useQuery({
    ...getDiariesQueryOptions(),
    ...queryConfig,
  })
}
