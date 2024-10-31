export class Aviasales {
  _apiBase = 'https://aviasales-test-api.kata.academy'

  async getSearchId() {
    const endpoint = '/search'
    const url = this._apiBase + endpoint
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`)
    }
    const data = await response.json()
    return data.searchId
  }

  async getTickets(searchId: string) {
    const endpoint = `/tickets?searchId=${searchId}`
    const url = this._apiBase + endpoint
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`)
    }
    const data = await response.json()
    return data
  }
}
