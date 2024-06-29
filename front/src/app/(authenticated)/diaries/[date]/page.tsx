import { DairyDiariesList } from '@/features/diaries/components/dairy-diaries-list'

export default function Page({ params }: { params: { date: string } }) {
  return (
    <div className="mx-auto ml-5 w-full">
      <DairyDiariesList date={params.date} />
    </div>
  )
}
