import React, { useEffect } from 'react'
import { nanoid } from '@reduxjs/toolkit'

import { useAppDispatch, useAppSelector } from '../../hook'
import { fetchTickets, addVisibleTickets } from '../../store/appSlice'
import Ticket from '../ticket/ticket'

import styles from './tickets.module.scss'

export default function Tickets() {
  const dispatch = useAppDispatch()
  const searchId = useAppSelector((state) => state.app.searchId)
  const ticketsData = useAppSelector((state) => state.app.tickets)
  const visibleTicketsLength = useAppSelector((state) => state.app.visibleTicketsLength)
  const visibleTickets = ticketsData.slice(0, visibleTicketsLength)
  useEffect(() => {
    if (searchId) {
      dispatch(fetchTickets(searchId))
    }
  }, [dispatch, searchId])
  const handleClick = () => {
    dispatch(addVisibleTickets(5))
  }
  const tickets = visibleTickets.map((ticket) => {
    return <Ticket ticket={ticket} key={nanoid()} />
  })
  const buttonMore =
    visibleTicketsLength >= ticketsData.length ? null : (
      <button className={styles.button_show} onClick={handleClick} type="button">
        ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
      </button>
    )
  return (
    <section className={styles.tickets}>
      {tickets}
      {buttonMore}
    </section>
  )
}
