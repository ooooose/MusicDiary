import { Skeleton } from '@/components/ui/skeleton'

export const LoadingDiary = () => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-[30px] w-[100px]" />
        <Skeleton className="h-[300px] w-full" />
      </div>
      <div className="float-right mt-8">
        <Skeleton className="h-[40px] w-[120px]" />
      </div>
    </div>
  )
}
