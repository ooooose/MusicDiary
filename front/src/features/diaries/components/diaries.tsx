import { CreateDiary } from '@/features/diaries/components/create-diary'
import { DiariesList } from '@/features/diaries/components/diaries-list'

export const Diaries = () => {
  return (
    <div className='w-full justify-between'>
      <div className="mb-4 flex items-center">
        <h3 className="text-xl font-bold">日記カレンダー</h3>
        <CreateDiary />
      </div>
      <DiariesList />
    </div>
  )
}
