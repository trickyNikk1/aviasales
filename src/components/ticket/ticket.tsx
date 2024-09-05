import React from 'react'
import { format, addMinutes } from 'date-fns'

import type { TicketType } from '../../store/types'

import styles from './ticket.module.scss'
export default function Ticket({ ticket }: { ticket: TicketType }) {
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
  const logoSrc = `http://pics.avs.io/${logoWidth}/${logoHeight}/${carrier}.png`

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }
  const stopsFormat = (stops: string[]) => {
    return stops.join(', ')
  }
  return (
    <article className={styles.ticket}>
      <div className={styles.ticket__header}>
        <span className={styles.ticket__price}>{formatPrice(price)} Р</span>
        <img className={styles.ticket__logo} src={logoSrc} alt="logo"></img>
      </div>
      <div className={styles.ticket__info}>
        <div className={styles.ticket__column}>
          <div className={styles.ticket__row}>
            <h3 className={styles.ticket__title}>
              {origin} - {destination}
            </h3>
            <span className={styles.ticket__data}>
              {formatDateFrom} - {formatDateTo}
            </span>
          </div>
          <div className={styles.ticket__row}>
            <h3 className={styles.ticket__title}>
              {secondOrigin} - {secondDestination}
            </h3>
            <span className={styles.ticket__data}>
              {formatSecondDateFrom} - {formatSecondDateTo}
            </span>
          </div>
        </div>
        <div className={styles.ticket__column}>
          <div className={styles.ticket__row}>
            <h3 className={styles.ticket__title}>в пути</h3>
            <span className={styles.ticket__data}>{formatDuration(duration)}</span>
          </div>
          <div className={styles.ticket__row}>
            <h3 className={styles.ticket__title}>в пути</h3>
            <span className={styles.ticket__data}>{formatDuration(secondDuration)}</span>
          </div>
        </div>
        <div className={styles.ticket__column}>
          <div className={styles.ticket__row}>
            <h3 className={styles.ticket__title}>{stopsCount(stops)}</h3>
            <span className={styles.ticket__data}>{stopsFormat(stops)}</span>
          </div>
          <div className={styles.ticket__row}>
            <h3 className={styles.ticket__title}>{stopsCount(secondStops)}</h3>
            <span className={styles.ticket__data}>{stopsFormat(secondStops)}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
