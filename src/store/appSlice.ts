import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

import type { AppState, FilterType, ToggleType, TabType } from './types'

export const fetchSearchId = createAsyncThunk('app/fetchSearchId', async () => {
  const response = await fetch('https://aviasales-test-api.kata.academy/search')
  const data = await response.json()
  return data.searchId
})

export const fetchTickets = createAsyncThunk('app/fetchTickets', async (searchId: string) => {
  const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
  const data = await response.json()
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
  searchId: null,
  tickets: [],
  visibleTicketsLength: 5,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleFilters(state, action: PayloadAction<ToggleType>) {
      const activeFilters = Object.keys(state.filters).filter((key) => state.filters[key as FilterType])
      const { name, checked } = action.payload
      if (name === 'all' && checked) {
        state.filters = initialState.filters
      } else if (activeFilters.length === 3 && checked) {
        state.filters = initialState.filters
      } else if (name === 'all' && !checked) {
        for (const key in state.filters) {
          state.filters[key as FilterType] = false
        }
      } else if (name !== 'all' && !checked && activeFilters.length === 5) {
        state.filters.all = false
        state.filters[name] = !state.filters[name]
      } else {
        state.filters[name] = !state.filters[name]
      }
    },
    setTab(state, action: PayloadAction<TabType>) {
      state.tab = action.payload
    },
    addVisibleTickets(state, action) {
      state.visibleTicketsLength = state.visibleTicketsLength + action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchId.pending, (state) => {
      state.loading = 'pending'
      state.error = null
    })
    builder.addCase(fetchSearchId.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.searchId = action.payload
      state.error = null
    })
    builder.addCase(fetchSearchId.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.error.message ? action.error.message : 'Unknown error'
    })
    builder.addCase(fetchTickets.pending, (state) => {
      state.loading = 'pending'
      state.error = null
    })
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.tickets = action.payload.tickets
      state.error = null
    })
    builder.addCase(fetchTickets.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.error.message ? action.error.message : 'Unknown error'
    })
  },
})

export const { setTab, toggleFilters, addVisibleTickets } = appSlice.actions
export default appSlice.reducer
