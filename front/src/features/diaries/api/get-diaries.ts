import { apiClient } from '@/lib/api/apiClient'
import type { QueryConfig } from '@/lib/react-query/react-query'
import type { Diary } from '@/types/api'
import { endpoints } from '@/utils/constants/endpoints'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

export const getDiary = async (id: string) => {
  const response = await apiClient.apiGet(`${endpoints.diaries}/${id}`)
  return response.data
}

export const getDiaries = async (): Promise<Diary[]> => {
  const response = await apiClient.apiGet(endpoints.diaries)
  return response.data
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
