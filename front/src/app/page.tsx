import HomeLayout from '@/components/layouts/Layout/HomeLayout'
import Link from 'next/link'

export default function Home() {
  return (
    <HomeLayout>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        TOPページ作成中
        <br />
        <Link href="/diaries">はじめる</Link>
      </main>
    </HomeLayout>
  )
}
