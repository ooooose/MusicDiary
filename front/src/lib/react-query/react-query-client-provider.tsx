'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { queryClient } from '@/lib/react-query/react-query'

export const ReactQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
