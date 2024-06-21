import { apiClient } from "@/lib/api/apiClient"
import { endpoints } from "@/utils/constants/endpoints"

export const getDiaries = async () => {
  return apiClient.apiGet(endpoints.DIARIES).then((res) => res.json())
}