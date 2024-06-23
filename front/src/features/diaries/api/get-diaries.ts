import { apiClient } from '@/lib/api/apiClient'
import type { QueryConfig } from '@/lib/react-query/react-query'
import type { Diary } from '@/types/api'
import { endpoints } from '@/utils/constants/endpoints'
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query'

export const getDiary = async (id: string) => {
  return apiClient
    .apiGet(`${endpoints.diaries}/${id}`)
    .then((res) => res.json())
}

export const getDiaries = async (): Promise<Diary[]> => {
  return apiClient.apiGet(endpoints.diaries).then((res) => res.json())
}

export const getDiariesQueryOptions = (): UseQueryOptions<Diary[], Error> => {
  return {
    queryKey: ['diaries'],
    queryFn: getDiaries,
  }
}

type UseDiariesOptions = {
  queryConfig?: QueryConfig<typeof getDiaries>
}

export const useDiaries = ({ queryConfig }: UseDiariesOptions = {}) => {
  return useQuery<Diary[], Error>({
    ...getDiariesQueryOptions(),
    ...queryConfig,
  })
}
