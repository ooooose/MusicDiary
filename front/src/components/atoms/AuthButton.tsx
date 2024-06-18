'use client'
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';


const AuthButton = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const handleSignIn = () => {
    signIn('google')
  }

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
        <Button variant="outline" onClick={handleSignIn}>
          Google認証ボタン
        </Button>
      )}
    </div>
  )
};

export default AuthButton;

