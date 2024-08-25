import React from 'react'

import styles from './filters.module.scss'

export default function Filters() {
  return (
    <form className={styles.filters}>
      <h2 className={styles.filters__title}>Количество пересадок</h2>
      <div className={styles.filters__filter}>
        <input className={styles.filters__checkbox} type="checkbox" name="all" id="all" />
        <label className={styles.filters__label} htmlFor="all">
          Все
        </label>
      </div>
      <div className={styles.filters__filter}>
        <input className={styles.filters__checkbox} type="checkbox" name="no-transfers" id="no-transfers" />
        <label className={styles.filters__label} htmlFor="no-transfers">
          Без пересадок
        </label>
      </div>
      <div className={styles.filters__filter}>
        <input className={styles.filters__checkbox} type="checkbox" name="1-transfer" id="1-transfer" />
        <label className={styles.filters__label} htmlFor="1-transfer">
          1 Пересадка
        </label>
      </div>
      <div className={styles.filters__filter}>
        <input className={styles.filters__checkbox} type="checkbox" name="2-transfers" id="2-transfers" />
        <label className={styles.filters__label} htmlFor="2-transfers">
          2 Пересадки
        </label>
      </div>
      <div className={styles.filters__filter}>
        <input className={styles.filters__checkbox} type="checkbox" name="3-transfers" id="3-transfers" />
        <label className={styles.filters__label} htmlFor="3-transfers">
          3 Пересадки
        </label>
      </div>
    </form>
  )
}
