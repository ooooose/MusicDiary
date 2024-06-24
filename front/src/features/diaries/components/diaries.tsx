import { CreateDiary } from '@/features/diaries/components/create-diary'
import { DiariesList } from '@/features/diaries/components/diaries-list'

export const Diaries = () => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">日記一覧:</h3>
        <CreateDiary />
      </div>
      <DiariesList />
    </div>
  )
}
