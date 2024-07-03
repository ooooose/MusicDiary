import React from 'react'

import Footer from '@/components/layouts/Footer/Footer'
import HomeHeader from '@/components/layouts/Header/HomeHeader'

type HomeLayoutProps = {
  children: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="select-none">
      <HomeHeader />
      <div className="mx-auto w-full md:w-2/3">
        <div className="flex min-h-[500px] flex-col items-center justify-between">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HomeLayout
