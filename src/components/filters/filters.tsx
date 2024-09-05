import React from 'react'

import { toggleFilters } from '../../store/appSlice'
import { useAppDispatch, useAppSelector } from '../../hook'
import type { FilterType } from '../../store/types'

import styles from './filters.module.scss'

export default function Filters() {
  const dispatch = useAppDispatch()

  const changeHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    const { name, checked } = event.target
    dispatch(toggleFilters({ name: name as FilterType, checked: checked as boolean }))
  }
  const filters = useAppSelector((state) => state.app.filters)
  return (
    <form className={styles.filters} onChange={changeHandler}>
      <h2 className={styles.filters__title}>Количество пересадок</h2>
      <div className={styles.filters__filter}>
        <input
          className={styles.filters__checkbox}
          type="checkbox"
          name="all"
          id="all"
          checked={filters.all}
          readOnly
        />
        <label className={styles.filters__label} htmlFor="all">
          Все
        </label>
      </div>
      <div className={styles.filters__filter}>
        <input
          className={styles.filters__checkbox}
          type="checkbox"
          name="no-transfers"
          id="no-transfers"
          checked={filters['no-transfers']}
          readOnly
        />
        <label className={styles.filters__label} htmlFor="no-transfers">
          Без пересадок
        </label>
      </div>
      <div className={styles.filters__filter}>
        <input
          className={styles.filters__checkbox}
          type="checkbox"
          name="1-transfer"
          id="1-transfer"
          checked={filters['1-transfer']}
          readOnly
        />
        <label className={styles.filters__label} htmlFor="1-transfer">
          1 Пересадка
        </label>
      </div>
      <div className={styles.filters__filter}>
        <input
          className={styles.filters__checkbox}
          type="checkbox"
          name="2-transfers"
          id="2-transfers"
          checked={filters['2-transfers']}
          readOnly
        />
        <label className={styles.filters__label} htmlFor="2-transfers">
          2 Пересадки
        </label>
      </div>
      <div className={styles.filters__filter}>
        <input
          className={styles.filters__checkbox}
          type="checkbox"
          name="3-transfers"
          id="3-transfers"
          checked={filters['3-transfers']}
          readOnly
        />
        <label className={styles.filters__label} htmlFor="3-transfers">
          3 Пересадки
        </label>
      </div>
    </form>
  )
}
