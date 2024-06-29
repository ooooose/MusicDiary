import { Skeleton } from '@/components/ui/skeleton'

export const LoadingDiary = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-[30px] w-[100px]" />
      <Skeleton className="h-[300px] w-full" />
    </div>
  )
}
