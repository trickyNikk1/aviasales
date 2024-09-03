import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type FilterType = 'all' | 'no-transfers' | '1-transfer' | '2-transfers' | '3-transfers'
type FiltersType = {
  [K in FilterType]: boolean
}
export type TabType = 'cheapest' | 'fastest' | 'optimal'
type AppState = {
  tab: TabType
  filters: FiltersType
}

export type ToggleType = {
  name: FilterType
  checked: boolean
}

const initialState: AppState = {
  tab: 'cheapest',
  filters: {
    all: true,
    'no-transfers': true,
    '1-transfer': true,
    '2-transfers': true,
    '3-transfers': true,
  },
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
      console.log(state)
      console.log(action)
      state.tab = action.payload
    },
  },
})

export const { setTab, toggleFilters } = appSlice.actions
export default appSlice.reducer
