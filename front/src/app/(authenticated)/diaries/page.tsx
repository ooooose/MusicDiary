import Link from 'next/link'

export default function Page() {
  return (
    <div>
      日記一覧
      <Link href="/diaries/create">日記を作成する</Link>
    </div>
  )
}
