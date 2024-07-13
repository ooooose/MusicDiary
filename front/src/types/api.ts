export type BaseEntity = {
  id: string
  createdAt: string
}

export type Entity<T> = {
  [K in keyof T]: T[K]
} & BaseEntity

export type User = Entity<{
  uid: string
  name: string
  email: string
  image: string
}>

export type Diary = Entity<{
  uid: string
  body: string
  userId: number
  tracks: Track[]
}>

export type Track = Entity<{
  title: string
  artist: string
  spotifyId: string
  image: string
}>
