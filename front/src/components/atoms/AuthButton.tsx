'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { signIn, signOut, useSession } from 'next-auth/react'

const AuthButton = () => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <div>
      {loading ? (
        <Skeleton className="h-[50px] w-[100px]" />
      ) : session ? (
        <div className="flex items-center gap-2 h-full justify-center">
          <p className="text-center">{session.user?.name} さん</p>
          <Button variant="outline" onClick={() => signOut()}>
            ログアウト
          </Button>
        </div>
      ) : (
        <Button variant="outline" onClick={() => signIn('google', {})}>
          Google認証ボタン
        </Button>
      )}
    </div>
  )
}

export default AuthButton
