import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'

dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  weekdays: ['日', '月', '火', '水', '木', '金', '土'],
})

export const formatDateForDairyDiaries = (date: Date): string =>
  dayjs(date).format('YYYY-MM-DD')

export const formatDateForDiary = (date: Date): string =>
  dayjs(date).format('YYYY年MM月DD日（ddd）')

export const formatToday = (): string => {
  return dayjs(new Date()).format('YYYY年MM月DD日（ddd）')
}
