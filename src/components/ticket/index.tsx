import React from 'react'
import { format, addMinutes } from 'date-fns'

import type { TicketType } from '../../store/types'

import styles from './ticket.module.scss'
export function Ticket({ ticket }: { ticket: TicketType }) {
  const { carrier, price, segments } = ticket
  const [first, second] = segments
  const { origin, destination, date, stops, duration } = first
  const {
    origin: secondOrigin,
    destination: secondDestination,
    date: secondDate,
    stops: secondStops,
    duration: secondDuration,
  } = second

  const formatDateFrom = format(new Date(date), 'HH:mm')
  const formatDateTo = format(addMinutes(new Date(date), duration), 'HH:mm')

  const formatSecondDateFrom = format(new Date(secondDate), 'HH:mm')
  const formatSecondDateTo = format(addMinutes(new Date(secondDate), secondDuration), 'HH:mm')

  const formatDuration = (duration: number) => {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60
    return `${hours}ч ${minutes}м`
  }

  const stopsCount = (stops: string[]) => {
    const text = stops.length === 1 ? 'пересадка' : 'пересадки'
    return stops.length ? `${stops.length} ${text}` : 'Без пересадок'
  }

  const logoWidth = '110'
  const logoHeight = '36'
  const logoSrc = `https://pics.avs.io/${logoWidth}/${logoHeight}/${carrier}.png`

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }
  const stopsFormat = (stops: string[]) => {
    if (stops.length === 0) {
      return '-'
    }
    return stops.join(', ')
  }
  return (
    <article className={styles.ticket}>
      <div className={styles.header}>
        <span className={styles.price}>{formatPrice(price)} Р</span>
        <img className={styles.logo} src={logoSrc} alt="logo"></img>
      </div>
      <div className={styles.info}>
        <div className={styles.column}>
          <div className={styles.row}>
            <h3 className={styles.title}>
              {origin} - {destination}
            </h3>
            <span className={styles.data}>
              {formatDateFrom} - {formatDateTo}
            </span>
          </div>
          <div className={styles.row}>
            <h3 className={styles.title}>
              {secondOrigin} - {secondDestination}
            </h3>
            <span className={styles.data}>
              {formatSecondDateFrom} - {formatSecondDateTo}
            </span>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.row}>
            <h3 className={styles.title}>в пути</h3>
            <span className={styles.data}>{formatDuration(duration)}</span>
          </div>
          <div className={styles.row}>
            <h3 className={styles.title}>в пути</h3>
            <span className={styles.data}>{formatDuration(secondDuration)}</span>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.row}>
            <h3 className={styles.title}>{stopsCount(stops)}</h3>
            <span className={styles.data}>{stopsFormat(stops)}</span>
          </div>
          <div className={styles.row}>
            <h3 className={styles.title}>{stopsCount(secondStops)}</h3>
            <span className={styles.data}>{stopsFormat(secondStops)}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
