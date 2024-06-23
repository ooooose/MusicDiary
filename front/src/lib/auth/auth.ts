import type { User } from "@/types/api";
import { apiClient } from "@/lib/api/apiClient";
import { endpoints } from "@/utils/constants/endpoints";


export const getUser = (): Promise<User> => {
  return apiClient.apiGet(endpoints.me)
}