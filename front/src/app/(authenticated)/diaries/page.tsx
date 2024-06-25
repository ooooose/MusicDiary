import { CreateDiary } from "@/features/diaries/components/create-diary"

export default function Page() {
  return (
    <div className="mx-auto ml-5 w-full">
      日記を作成する
      <CreateDiary />
    </div>
  )
}