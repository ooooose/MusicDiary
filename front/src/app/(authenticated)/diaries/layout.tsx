import { DiariesList } from '@/features/diaries/components/diaries-list'

export default function DiaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mt-[50px] flex w-full">
      <DiariesList />
      {children}
    </div>
  )
}
