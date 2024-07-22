import type { Track } from "@/types/api"

export interface WebSocketMessage {
  track?: Track
  error?: string
  diary_id: string
}
