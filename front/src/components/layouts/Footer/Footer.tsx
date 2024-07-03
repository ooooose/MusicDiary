import AuthButton from '@/components/atoms/AuthButton'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="mt-36 border-0 border-t border-solid bg-gray-50 py-6 text-gray-500">
      <div className="mx-auto w-3/4">
        <div className="flex items-center justify-between px-4 pb-12">
          <div className="flex flex-col gap-4">
            <div className="mt-10">
              <h2 className="text-3xl">Music Diary</h2>
              <p>一日を音楽と共に振り返ろう</p>
            </div>
            <AuthButton />
          </div>
          <div className="flex flex-col gap-y-3 pt-7">
            <Link href="/">アプリについて</Link>
            <Link href="/policy">規約について</Link>
          </div>
        </div>
        <p className="mb-2 mt-10 text-center">
          All right reserved by
          <a
            className="ml-2 border-b border-dotted border-blue-500"
            href="https://twitter.com/ooooonse0524"
            target="_blank"
          >
            @ooooonse0524
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
