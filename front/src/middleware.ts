export { default } from 'next-auth/middleware'

export const config = {
  // ログインが必要なページのパスを指定
  matcher: ['/diaries', '/diaries/create'],
}
