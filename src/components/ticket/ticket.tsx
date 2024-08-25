import React from 'react'

import styles from './ticket.module.scss'

interface Ticket {
  // Цена в рублях
  price: number
  // Код авиакомпании (iata)
  carrier: string
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
  segments: [
    {
      // Код города (iata)
      origin: string
      // Код города (iata)
      destination: string
      // Дата и время вылета туда
      date: string
      // Массив кодов (iata) городов с пересадками
      stops: string[]
      // Общее время перелёта в минутах
      duration: number
    },
    {
      // Код города (iata)
      origin: string
      // Код города (iata)
      destination: string
      // Дата и время вылета обратно
      date: string
      // Массив кодов (iata) городов с пересадками
      stops: string[]
      // Общее время перелёта в минутах
      duration: number
    },
  ]
}
export default function Ticket() {
  return (
    <article className={styles.ticket}>
      <div className={styles.ticket__header}>
        <span className={styles.ticket__price}>13 400 Р</span>
        <img className={styles.ticket__logo} src="src\components\ticket\logo\S7-logo.png" alt="logo"></img>
      </div>
      <div className={styles.ticket__info}>
        <div className={styles.ticket__column}>
          <div className={styles.ticket__row}>
            <h3 className={styles.ticket__title}>MOW - HKT</h3>
            <span className={styles.ticket__data}>10:55 - 08:00</span>
          </div>
          <div className={styles.ticket__row}>
            <h3 className={styles.ticket__title}>MOW - HKT</h3>
            <span className={styles.ticket__data}>11:20 - 00:50</span>
          </div>
        </div>
        <div className={styles.ticket__column}>
          <div className={styles.ticket__row}>
            <h3 className={styles.ticket__title}>в пути</h3>
            <span className={styles.ticket__data}>21ч 15 м</span>
          </div>
          <div className={styles.ticket__row}>
            <h3 className={styles.ticket__title}>в пути</h3>
            <span className={styles.ticket__data}>13ч 30м</span>
          </div>
        </div>
        <div className={styles.ticket__column}>
          <div className={styles.ticket__row}>
            <h3 className={styles.ticket__title}>2 пересадки</h3>
            <span className={styles.ticket__data}>HKG, JNB</span>
          </div>
          <div className={styles.ticket__row}>
            <h3 className={styles.ticket__title}>1 пересадка</h3>
            <span className={styles.ticket__data}>HKG</span>
          </div>
        </div>
      </div>
    </article>
  )
}
