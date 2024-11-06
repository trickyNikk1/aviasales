import { useAppDispatch, useAppSelector } from '@hooks/index'
import { getTickets } from '@store/appSlice'

import { loadingType } from '../../types'

export const currentStatus = () => {
  const { loading, error, stop, filteredTickets: filteredTicketsData } = useAppSelector((state) => state.app)
  let status: loadingType | 'no-results' = loading
  if (!filteredTicketsData.length && loading === 'succeeded') {
    status = 'no-results'
  } else if (!stop && !error) {
    status = 'pending'
  }
  return status
}
export const getAllTickets = (stop: boolean, searchId: string, dispatch: ReturnType<typeof useAppDispatch>) => {
  if (stop) {
    return
  }
  dispatch(getTickets(searchId)).then((action) => {
    if (action.payload) {
      return getAllTickets(action.payload.stop, searchId, dispatch)
    }
    getAllTickets(stop, searchId, dispatch)
  })
}
