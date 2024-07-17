class Url {
  readonly BASE_URL = '/api/v1'

  get diaries() {
    return `${this.BASE_URL}/diaries`
  }

  get tracks() {
    return `${this.BASE_URL}/tracks`
  }

  set_music(uid: string) {
    return `${this.BASE_URL}/diaries/${uid}/music`
  }

  dairy_diaries(date: string) {
    return `${this.BASE_URL}/diaries/date/${date}`
  }

  get me() {
    return `${this.BASE_URL}/me`
  }
}

export const endpoints = new Url()
