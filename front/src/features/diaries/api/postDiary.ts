import { apiClient } from "@/lib/api/apiClient"
import { endpoints } from "@/utils/constants/endpoints"

type paramsType = {
  body: string
}

export const postDiary = async (params: paramsType) => {
  return await apiClient
    .apiPost(endpoints.DIARIES, params)
    .then((result) => result.json())
}
