import React from 'react'

import type { TicketType } from '../../types'

import { formatPrice, itineraryDateRange, stopsCount, stopsFormat, formatDuration } from './ticket.helpers'
import styles from './ticket.module.scss'

export function Ticket({ ticket }: { ticket: TicketType }) {
  const { carrier, price, segments } = ticket
  const [outboundSegment, inboundSegment] = segments
  const {
    origin: outboundOrigin,
    destination: outboundDestination,
    date: outboundDate,
    stops: outboundStops,
    duration: outboundDuration,
  } = outboundSegment
  const {
    origin: inboundOrigin,
    destination: inboundDestination,
    date: inboundDate,
    stops: inboundStops,
    duration: inboundDuration,
  } = inboundSegment

  const ticketDataStructure = [
    [
      { title: `${outboundOrigin} - ${outboundDestination}`, data: itineraryDateRange(outboundDate, outboundDuration) },
      { title: `${inboundOrigin} - ${inboundDestination}`, data: itineraryDateRange(inboundDate, inboundDuration) },
    ],
    [
      { title: 'В пути', data: formatDuration(outboundDuration) },
      { title: 'В пути', data: formatDuration(inboundDuration) },
    ],
    [
      { title: stopsCount(outboundStops), data: stopsFormat(outboundStops) },
      { title: stopsCount(inboundStops), data: stopsFormat(inboundStops) },
    ],
  ]

  return (
    <div className={styles.ticket}>
      <div className={styles.header}>
        <span className={styles.price}>{formatPrice(price)} Р</span>
        <img className={styles.logo} src={`https://pics.avs.io/110/36/${carrier}.png`} alt="logo" />
      </div>
      <div className={styles.info}>
        {ticketDataStructure.map((column, index) => {
          return (
            <div className={styles.column} key={index}>
              {column.map((row, i) => {
                return (
                  <div key={row.title + i}>
                    <h3 className={styles.title}>{row.title}</h3>
                    <span className={styles.data}>{row.data}</span>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
