import { apiClient } from '@/lib/api/apiClient'
import type { QueryConfig } from '@/lib/react-query/react-query'
import type { Diary } from '@/types/api'
import { endpoints } from '@/utils/constants/endpoints'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { DeserializerOptions } from 'jsonapi-serializer'
import { Deserializer } from 'jsonapi-serializer'

const deserializerOptions: DeserializerOptions = {
  keyForAttribute: 'camelCase',
}

export const getDairyDiaries = async ({
  date,
}: {
  date: string
}): Promise<Diary[]> => {
  try {

    const response = await apiClient.apiGet(endpoints.dairy_diaries(date))
    const deserializer = new Deserializer(deserializerOptions)
    const diaries = await deserializer.deserialize(response)
    return diaries
  } catch (error) {
    console.error('日記一覧の取得に失敗しました:', error)
    throw error
  }
}

export const getDairyDiariesQueryOptions = (date: string): UseQueryOptions<Diary[], Error> => {
  return {
    queryKey: ['diaries', date],
    queryFn: () => getDairyDiaries({ date }),
  }
}

type UseDairyDiariesOptions = {
  date: string
  queryConfig?: QueryConfig<typeof getDairyDiaries>
}

export const useDairyDiaries = ({ date, queryConfig }: UseDairyDiariesOptions) => {
  return useQuery<Diary[], Error>({
    ...getDairyDiariesQueryOptions(date),
    ...queryConfig,
  })
}
