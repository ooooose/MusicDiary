import { DiariesList } from '@/features/diaries/components/diaries-list'

export default function DiaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-5">
      <DiariesList />
      {children}
    </div>
  )
}
