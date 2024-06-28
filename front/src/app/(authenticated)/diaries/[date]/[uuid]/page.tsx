import { Diary } from "@/features/diaries/components/diary"

export default function Page({ params }: { params: { date: string, uuid: string } }) {
  return (
    <div className="mx-auto ml-5 w-full">
      <Diary date={params.date} diaryId={params.uuid} />
    </div>
  )
}
