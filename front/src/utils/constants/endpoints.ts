class Url {
  readonly BASE_URL = '/api/v1'

  get diaries() {
    return `${this.BASE_URL}/diaries`
  }

  get me() {
    return `${this.BASE_URL}/me`
  }
}

export const endpoints = new Url()
