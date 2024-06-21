import { apiClient } from '@/lib/api/apiClient'
import { endpoints } from '@/utils/constants/endpoints'

export const getDiary = async (id: string) => {
  return apiClient.apiGet(`${endpoints.DIARIES}/${id}`).then((res) => res.json())
}
