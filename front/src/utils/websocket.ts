export const getWebSocketUrl = () => {
  if (typeof window === 'undefined') {
    const defaultProtocol = 'wss:'
    const defaultHost = process.env.NEXT_PUBLIC_API_URL || 'localhost'
    return `${defaultProtocol}//${defaultHost}/cable`
  }

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  const host = process.env.NEXT_PUBLIC_API_URL || window.location.host
  return `${protocol}//${host}/cable`
}
