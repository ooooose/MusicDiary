import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      userId: string
      accessToken?: string | undefined
    } & DefaultSession['user']
  }

  interface User {
    userId: string
    accessToken?: string | undefined
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string
    accessToken?: string | undefined
    refreshToken?: string
    accessTokenExpires?: number
    error?: string
  }
}
