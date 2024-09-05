import React, { useEffect } from 'react'
import { nanoid } from '@reduxjs/toolkit'

import { useAppDispatch, useAppSelector } from '../../hook'
import { fetchTickets } from '../../store/appSlice'
import Ticket from '../ticket/ticket'

import styles from './tickets.module.scss'

export default function Tickets() {
  const dispatch = useAppDispatch()
  const searchId = useAppSelector((state) => state.app.searchId)
  useEffect(() => {
    if (searchId) {
      dispatch(fetchTickets(searchId))
    }
  }, [dispatch, searchId])
  const ticketsData = useAppSelector((state) => state.app.tickets)
  const tickets = ticketsData.map((ticket) => {
    return <Ticket ticket={ticket} key={nanoid()} />
  })
  return (
    <section className={styles.tickets}>
      {tickets}
      <button className={styles.button_show} type="button">
        ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
      </button>
    </section>
  )
}
