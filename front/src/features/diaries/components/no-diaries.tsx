type NoDiariesProps = {
  date: string
}

export const NoDiaries = ({ date }: NoDiariesProps) => {
  return (
    <div className="flex flex-col gap-4">
      {date}
      <p>この日の日記はありません。</p>
    </div>
  )
}
