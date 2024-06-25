import { DiariesCalendar } from "@/features/diaries/components/diaries-calendar"

export default function DiaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mt-[50px] flex w-full">
      <DiariesCalendar />
      {children}
    </div>
  )
}
