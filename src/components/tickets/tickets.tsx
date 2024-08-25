import React from 'react'

import Ticket from '../ticket/ticket'

import styles from './tickets.module.scss'

export default function Tickets() {
  return (
    <section className={styles.tickets}>
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
      <button className={styles.button_show} type="button">
        ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
      </button>
    </section>
  )
}
