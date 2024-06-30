import type { NextAuthOptions } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import GoogleProvider from 'next-auth/providers/google'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

async function refreshAccessToken(token: JWT) {
  try {
    const url =
      'https://oauth2.googleapis.com/token?' +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID ?? '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken ?? '',
      })

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      const provider = account?.provider
      const name = user?.name
      const email = user?.email
      const image = user?.image

      if (!provider || !name || !email) {
        console.error('認証情報の取得に失敗しました')
        return false
      }

      try {
        const response = await fetch(`${apiUrl}/auth/${provider}/callback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
              name,
              email,
              image,
            },
          }),
        })

        if (response.ok) {
          const data = await response.json()
          user.userId = data.user.id
          user.accessToken = data.accessToken
          return true
        } else {
          console.error(`Error: ${response.status} ${response.statusText}`)
          return false
        }
      } catch (error) {
        console.error(`Fetch error: ${error}`)
        return false
      }
    },
    async redirect() {
      return '/diaries'
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        token.userId = user.userId
        token.accessToken = user.accessToken
        token.refreshToken = account.refresh_token
      }
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token
      }

      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.user = token
      return session
    },
  },
}
