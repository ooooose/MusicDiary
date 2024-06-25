
export default function Page({ params }: { params: { date: string } }) {
  return (
    <div className="mx-auto ml-5 w-full">
      {params.date}
    </div>
  )
}
