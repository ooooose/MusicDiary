import AuthButton from "@/components/atoms/AuthButton"

export default function Page() {
  console.log(process.env.GOOGLE_CLIENT_ID)
  return (
    <div>
      <AuthButton />
    </div>
  )
}