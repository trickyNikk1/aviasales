export type loadingType = 'idle' | 'pending' | 'succeeded' | 'failed'

export type FilterType = 'all' | 'no-transfers' | '1-transfer' | '2-transfers' | '3-transfers'
type FiltersType = {
  [K in FilterType]: boolean
}
export type TabType = 'cheapest' | 'fastest' | 'optimal'

export type TicketType = {
  // Цена в рублях
  price: number
  // Код авиакомпании (iata)
  carrier: string
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
  segments: [
    {
      // Код города (iata)
      origin: string
      // Код города (iata)
      destination: string
      // Дата и время вылета туда
      date: string
      // Массив кодов (iata) городов с пересадками
      stops: string[]
      // Общее время перелёта в минутах
      duration: number
    },
    {
      // Код города (iata)
      origin: string
      // Код города (iata)
      destination: string
      // Дата и время вылета обратно
      date: string
      // Массив кодов (iata) городов с пересадками
      stops: string[]
      // Общее время перелёта в минутах
      duration: number
    },
  ]
}

export type AppState = {
  tab: TabType
  filters: FiltersType
  loading: loadingType
  error: string | null
  searchId: string | null
  tickets: TicketType[]
}

export type ToggleType = {
  name: FilterType
  checked: boolean
}

export type carriersType = {
  [key: string]: string
}
