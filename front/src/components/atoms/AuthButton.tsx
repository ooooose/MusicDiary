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
        <div>
          <p className="mb-2">{session.user?.name} さん</p>
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
