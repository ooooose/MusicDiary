class Url {
  readonly BASE_URL = '/api/v1'

  get diaries() {
    return `${this.BASE_URL}/diaries`
  }
  
  dairy_diaries(date: string) {
    return `${this.BASE_URL}/diaries/${date}`
  }

  get me() {
    return `${this.BASE_URL}/me`
  }
}

export const endpoints = new Url()
