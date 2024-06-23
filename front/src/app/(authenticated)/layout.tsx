import AuthenticatedLayout from '@/components/layouts/Layout/AuthenticatedLayout'
import { ReactQueryClientProvider } from '@/lib/react-query/react-query-client-provider'

export default function Authenticated({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthenticatedLayout>
      <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
    </AuthenticatedLayout>
  )
}
