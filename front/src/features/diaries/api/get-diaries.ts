import { apiClient } from '@/lib/api/apiClient'
import type { QueryConfig } from '@/lib/react-query/react-query'
import type { Diary } from '@/types/api'
import { endpoints } from '@/utils/constants/endpoints'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { Deserializer } from 'jsonapi-serializer'

// 追加でオプションがあれば設定する
const deserializerOptions = {}

export const getDiary = async (id: string): Promise<Diary> => {
  try {
    const response = await apiClient.apiGet(`${endpoints.diaries}/${id}`)
    const deserializer = new Deserializer(deserializerOptions)
    const diary = await deserializer.deserialize(response)
    return diary
  } catch (error) {
    console.error('日記の取得に失敗しました。:', error)
    throw error
  }
}

export const getDiaries = async (): Promise<Diary[]> => {
  try {
    const response = await apiClient.apiGet(endpoints.diaries)
    const deserializer = new Deserializer(deserializerOptions)
    const diaries = await deserializer.deserialize(response)
    return diaries
  } catch (error) {
    console.error('日記一覧の取得に失敗しました:', error)
    throw error
  }
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
