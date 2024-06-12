class ApiClient {
  baseURL: string

  constructor() {
    this.baseURL = process.env.NEXT_APP_URL ?? ''
  }

  async apiGet(url: string) {
    const response = await fetch(`${this.baseURL}${url}`)
    return response
  }

  async apiPost(url: string, body = {}) {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(body),
    })
    return response
  }

  async apiPut(url: string, body = {}) {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(body),
    })
    return response
  }

  async apiDelete(url: string, body = {}) {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(body),
    })
    return response
  }
}

export const apiClient = new ApiClient()
