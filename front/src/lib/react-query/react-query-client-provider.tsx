'use client'

import { queryClient } from '@/lib/react-query/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

export const ReactQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
