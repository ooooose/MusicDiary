import { getJWEToken } from "@/libs/auth/jwt";
import { apiClient } from "@/libs/api/apiClient";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const jweToken = await getJWEToken(req)
  const res = await apiClient.apiGet(`/api/v1/users`, {
    headers: { Authorization: `Bearer ${jweToken}` },
  });
  const data = await res.json();

  return Response.json({ ...data });
}

export async function POST(req: NextRequest) {
  const jweToken = await getJWEToken(req)
  const reqBody = await req.json()

  const res = await apiClient.apiPost(`/api/v1/users`, reqBody, {
    headers: { Authorization: `Bearer ${jweToken}` },
  })
  const data = await res?.json()

  return Response.json({ ...data })
}