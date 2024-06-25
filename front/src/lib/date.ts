import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'

dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  weekdays: ['日', '月', '火', '水', '木', '金', '土'],
})

export const formatDateForDairyDiaries = (date: Date) =>
  dayjs(date).format('YYYY-MM-DD')

export const formatDateForDiary = (date: Date) => dayjs(date).format('YYYY M/D')

export const formatToday = () => {
  return dayjs(new Date()).format('YYYY年MM月DD日（ddd）')
}

