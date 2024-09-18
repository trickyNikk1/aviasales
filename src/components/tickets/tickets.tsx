import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../hook'
import { getTickets, addVisibleTickets, filterTickets, getSearchId, updateTab } from '../../store/appSlice'
import Ticket from '../ticket/ticket'
import { ReactComponent as Loader } from '../loader/loader.svg'

import styles from './tickets.module.scss'

export default function Tickets() {
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
  const getAllTickets = (stop: boolean, searchId: string) => {
    if (stop) {
      return
    }
    dispatch(getTickets(searchId))
      .then((action) => {
        if (action.payload) {
          return getAllTickets(action.payload.stop, searchId)
        }
        getAllTickets(stop, searchId)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  useEffect(() => {
    dispatch(getSearchId())
  }, [])

  useEffect(() => {
    if (searchId) {
      getAllTickets(stop, searchId)
    }
  }, [dispatch, searchId])

  useEffect(() => {
    dispatch(filterTickets())
    dispatch(updateTab())
  }, [dispatch, ticketsData])

  const handleClick = () => {
    dispatch(addVisibleTickets(5))
  }

  const tickets = visibleTickets.map((ticket) => {
    return <Ticket ticket={ticket} key={ticket.id} />
  })
  const buttonMore =
    visibleTicketsLength >= filteredTicketsData.length ? null : (
      <button className={styles.button_show} onClick={handleClick} type="button">
        ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
      </button>
    )
  const errorMessage = !error ? null : (
    <div className={styles.error}>
      <h2 className={styles.error__title}>Произошла ошибка</h2>
      <p className={styles.error__text}>{error}</p>
    </div>
  )
  const warning =
    ticketsData.length && !filteredTicketsData.length && !error ? (
      <div className={styles.warning}>
        <h2 className={styles.warning__title}>Рейсов, подходящих под заданные фильтры, не найдено.</h2>
        <p className={styles.warning__text}>Попробуйте изменить фильтры.</p>
      </div>
    ) : null
  const loader = stop || warning ? null : <Loader className={styles.loader} />
  return (
    <section className={styles.tickets}>
      {warning}
      {errorMessage}
      {loader}
      {tickets}
      {buttonMore}
    </section>
  )
}
