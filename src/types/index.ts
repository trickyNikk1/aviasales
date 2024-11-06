import { SerializedError } from '@reduxjs/toolkit'

export type loadingType = 'idle' | 'pending' | 'succeeded' | 'failed'

export type FiltersType = {
  [K in string]: boolean
}
export type TabType = 'cheapest' | 'fastest' | 'optimal'

export type TicketType = {
  // Идентификатор билета
  id: string
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
  error: SerializedError | null
  errorStreak: number
  searchId: string | null
  tickets: TicketType[]
  filteredTickets: TicketType[]
  visibleTicketsLength: number
  stop: boolean
}

export type ToggleType = {
  name: string
  checked: boolean
}

export type carriersType = {
  [key: string]: string
}
