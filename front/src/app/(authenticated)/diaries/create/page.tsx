import { CreateDiary } from '@/features/diaries/components/create-diary'
import Link from 'next/link'

export default function Page() {
  return (
    <div>
      日記作成画面
      <CreateDiary />
      <Link href="/diaries">戻る</Link>
    </div>
  )
}
