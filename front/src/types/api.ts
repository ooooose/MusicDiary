export type BaseEntity = {
  id: string
  createdAt: number
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
  body: string
  userId: number
}>
