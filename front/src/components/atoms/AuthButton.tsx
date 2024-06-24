'use client'
import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'

const AuthButton = () => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : session ? (
        <div>
          <p>Signed in as {session.user?.email}</p>
          <Button onClick={() => signOut()}>Sign out</Button>
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
