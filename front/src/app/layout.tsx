import type { Metadata } from 'next'

import { Notifications } from '@/components/atoms/notifications'
import NextAuthProvider from '@/lib/auth/next-auth-provider'
import { cn } from '@/lib/utils'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})
export const metadata: Metadata = {
  title: 'Music Diary',
  description: '一日の終わりを音楽と共に振り返ることができるサービスです。',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Notifications />
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
