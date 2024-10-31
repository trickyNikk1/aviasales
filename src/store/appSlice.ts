import { createSlice, PayloadAction, createAsyncThunk, nanoid, current } from '@reduxjs/toolkit'

import { Aviasales } from '../services/aviasales'

import type { AppState, FilterType, ToggleType, TabType, TicketType } from './types'

const aviasales = new Aviasales()

export const getSearchId = createAsyncThunk('app/getSearchId', async () => {
  const searchId = await aviasales.getSearchId()
  return searchId
})

export const getTickets = createAsyncThunk('app/getTickets', async (searchId: string) => {
  const data = await aviasales.getTickets(searchId)
  return data
})

const initialState: AppState = {
  tab: 'cheapest',
  filters: {
    all: true,
    'no-transfers': true,
    '1-transfer': true,
    '2-transfers': true,
    '3-transfers': true,
  },
  loading: 'idle',
  error: null,
  errorStreak: 0,
  searchId: null,
  tickets: [],
  filteredTickets: [],
  visibleTicketsLength: 5,
  stop: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    filterTickets(state) {
      const { tickets } = current(state)
      if (state.filters.all) {
        state.filteredTickets = state.tickets
        return
      }
      const activeFilters = Object.keys(state.filters).filter((key) => state.filters[key as FilterType])
      if (!activeFilters.length) {
        state.filteredTickets = []
        return
      }
      const newFilteredTickets: TicketType[] = []
      if (state.filters['no-transfers']) {
        const filtred = tickets.filter((ticket) => {
          const outboundStops = ticket.segments[0].stops.length
          const inboundStops = ticket.segments[1].stops.length
          return !outboundStops && !inboundStops
        })
        newFilteredTickets.push(...filtred)
      }
      if (state.filters['1-transfer']) {
        const filtred = tickets.filter((ticket) => {
          const outboundStops = ticket.segments[0].stops.length
          const inboundStops = ticket.segments[1].stops.length
          return (outboundStops === 1 && inboundStops <= 1) || (inboundStops === 1 && outboundStops <= 1)
        })
        newFilteredTickets.push(...filtred)
      }
      if (state.filters['2-transfers']) {
        const filtred = tickets.filter((ticket) => {
          const outboundStops = ticket.segments[0].stops.length
          const inboundStops = ticket.segments[1].stops.length
          return (outboundStops === 2 && inboundStops <= 2) || (inboundStops === 2 && outboundStops <= 2)
        })
        newFilteredTickets.push(...filtred)
      }
      if (state.filters['3-transfers']) {
        const filtred = tickets.filter((ticket) => {
          const outboundStops = ticket.segments[0].stops.length
          const inboundStops = ticket.segments[1].stops.length
          return (outboundStops === 3 && inboundStops <= 3) || (inboundStops === 3 && outboundStops <= 3)
        })
        newFilteredTickets.push(...filtred)
      }
      state.filteredTickets = newFilteredTickets
    },
    toggleFilters(state, action: PayloadAction<ToggleType>) {
      const allFilters = Object.keys(state.filters)
      const activeFilters = allFilters.filter((key) => state.filters[key as FilterType])
      const { name, checked } = action.payload
      if (name === 'all' && checked) {
        state.filters = initialState.filters
      } else if (activeFilters.length === 3 && checked) {
        state.filters = initialState.filters
      } else if (name === 'all' && !checked) {
        for (const key in state.filters) {
          state.filters[key as FilterType] = false
        }
      } else if (name !== 'all' && !checked && activeFilters.length === allFilters.length) {
        state.filters.all = false
        state.filters[name] = !state.filters[name]
      } else {
        state.filters[name] = !state.filters[name]
      }
    },
    setTab(state, action: PayloadAction<TabType>) {
      state.tab = action.payload
    },
    updateTab(state) {
      if (state.tab === 'cheapest') {
        state.filteredTickets = state.filteredTickets.toSorted((a, b) => a.price - b.price)
      }
      if (state.tab === 'fastest') {
        state.filteredTickets = state.filteredTickets.toSorted(
          (a, b) => a.segments[0].duration - b.segments[0].duration
        )
      }
      if (state.tab === 'optimal') {
        state.filteredTickets = state.filteredTickets.toSorted(
          (a, b) => a.price * a.segments[0].duration - b.price * b.segments[0].duration
        )
      }
    },
    addVisibleTickets(state, action) {
      state.visibleTicketsLength = state.visibleTicketsLength + action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchId.pending, (state) => {
      state.loading = 'pending'
      state.error = null
    })
    builder.addCase(getSearchId.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.searchId = action.payload
      state.error = null
    })
    builder.addCase(getSearchId.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.error.message ? action.error.message : 'Unknown error'
    })
    builder.addCase(getTickets.pending, (state) => {
      state.loading = 'pending'
      state.error = null
    })
    builder.addCase(getTickets.fulfilled, (state, action) => {
      const newTickets = action.payload.tickets.map((ticket: TicketType) => {
        return {
          ...ticket,
          id: nanoid(),
        }
      })
      state.loading = 'succeeded'
      state.tickets = state.tickets.concat(newTickets)
      state.error = null
      state.errorStreak = 0
      state.stop = action.payload.stop
    })
    builder.addCase(getTickets.rejected, (state, action) => {
      state.loading = 'failed'
      state.errorStreak = state.errorStreak + 1
      if (state.errorStreak > 5) {
        state.error = action.error.message ? action.error.message : 'Unknown error'
        state.errorStreak = 0
      }
    })
  },
})

export const { setTab, toggleFilters, addVisibleTickets, filterTickets, updateTab } = appSlice.actions
export default appSlice.reducer
