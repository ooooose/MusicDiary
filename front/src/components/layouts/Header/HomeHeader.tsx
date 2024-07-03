import AuthButton from '@/components/atoms/AuthButton'
import Link from 'next/link'

const HomeHeader = () => {
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between bg-white/80 px-3 pb-4 pt-8 sm:px-10">
      <div className="mx-10 text-4xl font-medium ">
        <Link href="/">Music Diary</Link>
      </div>
      <AuthButton />
    </div>
  )
}

export default HomeHeader
