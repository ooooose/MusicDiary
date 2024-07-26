import { getDiaryQueryOptions } from '@/features/diaries/api/get-diary'
import { apiClient } from '@/lib/api/api-client'
import { formatDateForDairyDiaries } from '@/lib/date'
import type { MutationConfig } from '@/lib/react-query/react-query'
import { generateUUID } from '@/lib/uuid'
import type { Diary } from '@/types/api'
import { endpoints } from '@/utils/constants/endpoints'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { DeserializerOptions } from 'jsonapi-serializer'
import { Deserializer } from 'jsonapi-serializer'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

export const createDiaryInputSchema = z.object({
  body: z.string().min(1, '入力必須です'),
})

const deserializerOptions: DeserializerOptions = {
  keyForAttribute: 'camelCase',
}

export type CreateDiaryInput = z.infer<typeof createDiaryInputSchema>

export const createDiary = async (params: CreateDiaryInput): Promise<Diary> => {
  const uuid = generateUUID()
  const paramsWithUUID = { ...params, uid: uuid }

  const response = await apiClient.apiPost(endpoints.diaries, paramsWithUUID)
  const deserializer = new Deserializer(deserializerOptions)
  const diary = await deserializer.deserialize(response)
  return diary
}

type UsePostDiaryOptions = {
  mutationConfig?: MutationConfig<typeof createDiary>
}

export const useCreateDiary = ({ mutationConfig }: UsePostDiaryOptions) => {
  const queryClient = useQueryClient()
  const today = formatDateForDairyDiaries(new Date())
  const router = useRouter()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getDiaryQueryOptions(data.uid).queryKey,
      })
      onSuccess?.(data, ...args)
      router.push(`/diaries/${today}/${data.uid}`)
    },
    ...restConfig,
    mutationFn: createDiary,
  })
}
