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

export const getDiary = async (diaryId: string): Promise<Diary> => {
  try {
    const response = await apiClient.apiGet(`${endpoints.diaries}/${diaryId}`)
    const deserializer = new Deserializer(deserializerOptions)
    const diary = await deserializer.deserialize(response)
    return diary
  } catch (error) {
    console.error('日記の取得に失敗しました。:', error)
    throw error
  }
}

export const getDiaryQueryOptions = (
  diaryId: string,
): UseQueryOptions<Diary, Error> => {
  return {
    queryKey: ['diary', diaryId],
    queryFn: () => getDiary(diaryId),
  }
}

type UseDiaryOptions = {
  diaryId: string
  queryConfig?: QueryConfig<typeof getDiary>
}

export const useDiary = ({ diaryId, queryConfig }: UseDiaryOptions) => {
  return useQuery<Diary, Error>({
    ...getDiaryQueryOptions(diaryId),
    ...queryConfig,
  })
}
