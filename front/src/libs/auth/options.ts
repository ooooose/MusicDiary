import type { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { apiClient } from "@/libs/api/apiClient";
import type { User, Session } from 'next-auth'


export type CustomUser = User & {
  providerUserId: string;
}

export type CustomSession = Session & {
  user?: CustomUser
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
    maxAge: 7 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({token, user, account}) {
      if (account && user) {
        return {
          id: user.id,
          provider: account.provider,
          providerUserId: user.id,
          name: user.name,
          image: user.image,
          providerUserImage: user.image,
          accessToken: account.accessToken,
          accessTokenExpires: account.accessTokenExpires,
          refreshToken: account.refresh_token,
        }
      }

      return token
    },

    async session({session, token, user}) {
      session.user = token as unknown as CustomUser
      return { ...session, ...token, ...user }
    },
    async signIn({ user, account }) {
      const provider = account?.provider;
      const providerId = user?.id;
      const name = user?.name;
      try {
        const res = await apiClient.apiPost(`/api/v1/users`, {
          provider,
          providerId,
          name,
        });
        if (res.status === 200) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log("エラー", error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
}