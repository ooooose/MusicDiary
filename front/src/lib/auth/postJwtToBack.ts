import { BACK_URL } from "@/utils/constants/endpoints"

export const postJwtToBack = async (accessToken: string) => {
  const response = await fetch(BACK_URL.GOOGLE_AUTH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return await response.json()
}