import type { NextRequest } from "next/server"
import { getToken } from 'next-auth/jwt'

export async function getJWEToken(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET
  return await getToken({ req, secret, raw: true })
}
