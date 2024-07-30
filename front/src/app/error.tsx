'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Error({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  return (
    <div>
      <h2>エラーが発生しました</h2>
      <Button variant="default" onClick={() => router.push('/')}>
        トップに戻る
      </Button>
      <Button variant="outline" onClick={() => reset()}>
        再試行
      </Button>
    </div>
  )
}
