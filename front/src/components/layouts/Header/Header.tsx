import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between bg-white/80 px-3 pb-4 pt-8 text-4xl sm:px-10">
      <div className="mx-10 font-medium">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={200}
            height={100}
            priority
            className="h-[80px] w-auto"
          />
        </Link>
      </div>
    </div>
  )
}

export default Header
