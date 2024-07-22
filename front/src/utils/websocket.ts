export const getWebSocketUrl = () => {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  const host = process.env.NEXT_PUBLIC_API_URL || window.location.host
  return `${protocol}//${host}/cable`
}