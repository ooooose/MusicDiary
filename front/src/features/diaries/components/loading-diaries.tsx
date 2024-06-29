import { Skeleton } from '@/components/ui/skeleton'

export const LoadingDiaries = () => {
  return (
    <div>
      <Skeleton className="mb-2 h-[30px] w-[100px]" />
      <div className="flex flex-col space-y-3">
        {[...Array(6)].map((_, i) => {
          return <Skeleton key={i} className="h-[60px] w-full" />
        })}
      </div>
    </div>
  )
}
