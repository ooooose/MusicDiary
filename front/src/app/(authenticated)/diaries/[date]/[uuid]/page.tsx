export default function Page({ params }: { params: { uuid: string } }) {
  return (
    <div className="mx-auto ml-5 w-full">
      {params.uuid}
    </div>
  )
}
