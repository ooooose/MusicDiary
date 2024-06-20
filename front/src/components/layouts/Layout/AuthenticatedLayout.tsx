import React from 'react'

import Footer from '@/components/layouts/Footer/Footer'
import Header from '@/components/layouts/Header/Header'

type MainLayoutProps = {
  children: React.ReactNode
}

const AuthenticatedLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="select-none">
      <Header />
      <div className="mx-auto w-full md:w-2/3">
        <div className="flex min-h-[500px] flex-col items-center justify-between">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AuthenticatedLayout
