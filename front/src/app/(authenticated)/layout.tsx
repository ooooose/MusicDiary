import AuthenticatedLayout from "@/components/layouts/Layout/AuthenticatedLayout"

export default function Authenticated({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthenticatedLayout>
      {children}
    </AuthenticatedLayout>
  )
}
