import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

export const GoogleAuthButton = () => {
  const handleSignIn = () => {
    signIn('google')
  }
  return <Button variant="outline" onClick={handleSignIn}>認証ボタン</Button>
}
