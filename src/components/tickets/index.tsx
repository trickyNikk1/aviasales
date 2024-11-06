import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@hooks/index'
import { filterTickets, getSearchId, updateTab } from '@store/appSlice'
import { Ticket } from '@components/ticket'
import { ButtonMore } from '@components/tickets/button-more'
import { SetContent } from 'hoc/set-content'

import styles from './tickets.module.scss'
import { currentStatus, getAllTickets } from './tickets.helpers'

export function Tickets() {
  const dispatch = useAppDispatch()
  const {
    error,
    stop,
    searchId,
    tickets: ticketsData,
    filteredTickets: filteredTicketsData,
    visibleTicketsLength,
  } = useAppSelector((state) => state.app)
  const visibleTickets = filteredTicketsData.slice(0, visibleTicketsLength)

  useEffect(() => {
    dispatch(getSearchId())
  }, [])

  useEffect(() => {
    if (searchId) {
      getAllTickets(stop, searchId, dispatch)
    }
  }, [searchId])

  useEffect(() => {
    dispatch(filterTickets())
    dispatch(updateTab())
  }, [dispatch, ticketsData])

  return (
    <SetContent status={currentStatus()} error={error}>
      <section className={styles.container}>
        {visibleTickets.map((ticket) => (
          <Ticket ticket={ticket} key={ticket.id} />
        ))}
        <ButtonMore
          step={5}
          text={'ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!'}
          neededLength={visibleTicketsLength}
          currentLength={filteredTicketsData.length}
        />
      </section>
    </SetContent>
  )
}
