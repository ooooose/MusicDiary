import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

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
    maxAge: 7 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }) {
      const provider = account?.provider;
      const name = user?.name;
      const email = user?.email;

      if (!provider || !name || !email) {
        console.error('認証情報の取得に失敗しました');
        return false;
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
            },
          }),
        })

        console.log(`Response status: ${response.status}`);
        if (response.ok) {
          const data = await response.json();
          user.userId = data.user.id;
          user.accessToken = data.accessToken;
          return true;
        } else {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return false;
        }
      } catch (error) {
        console.error(`Fetch error: ${error}`);
        return false;
      }
    },
    async redirect({ baseUrl }) {
      return baseUrl
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        token.userId = user.userId
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token }) {
      session.user = token
      return session
    },
  },
}
