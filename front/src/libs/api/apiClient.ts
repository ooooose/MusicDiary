class ApiClient {
  baseURL: string

  constructor() {
    this.baseURL = process.env.NEXT_APP_URL ?? ''
  }

  private async request(url: string, options: RequestInit) {
    try {
      const response = await fetch(`${this.baseURL}${url}`, options)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Something went wrong')
      }
      return response.json()
    } catch (error) {
      console.error('API request failed', error)
      throw error
    }
  }

  async apiGet(url: string, headers = {}) {
    return this.request(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...headers,
      },
    })
  }

  async apiPost(url: string, body = {}, headers = {}) {
    return this.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...headers,
      },
      body: JSON.stringify(body),
    })
  }

  async apiPut(url: string, body = {}, headers = {}) {
    return this.request(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...headers,
      },
      body: JSON.stringify(body),
    })
  }

  async apiDelete(url: string, body = {}, headers = {}) {
    return this.request(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...headers,
      },
      body: JSON.stringify(body),
    })
  }
}

export const apiClient = new ApiClient()
