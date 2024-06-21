class Url {
  BACK_URL = process.env.NEXT_PUBLIC_API_URL
  DIARIES = `${this.BACK_URL}/api/v1/diaries`
}

export const endpoints = new Url()
