class Url {
  BACK_URL = process.env.NEXT_APP_URL
  GOOGLE_AUTH = `${this.BACK_URL}/api/v1/auth`
}

export const BACK_URL = new Url()
