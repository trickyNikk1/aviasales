import React, { ChangeEvent } from 'react'

import { useAppDispatch, useAppSelector } from '@hooks/index'
import { toggleFilters, filterTickets, updateTab } from '@store/appSlice'

import { filtersData } from './data'
import styles from './filters.module.scss'

export function Filters() {
  const dispatch = useAppDispatch()

  const { filters } = useAppSelector((state) => state.app)
  const changeHandler = (event: ChangeEvent<HTMLFormElement>) => {
    const { name, checked = false }: { name: string; checked?: boolean } = event.target
    dispatch(toggleFilters({ name, checked }))
    dispatch(filterTickets())
    dispatch(updateTab())
  }

  return (
    <form className={styles.filters} onChange={changeHandler}>
      <h2 className={styles.title}>Количество пересадок</h2>
      {filtersData.map((filterData) => {
        const { name, text } = filterData
        return (
          <div className={styles.filter} key={name}>
            <input className={styles.checkbox} type="checkbox" name={name} id={name} checked={filters[name]} readOnly />
            <label className={styles.label} htmlFor={name}>
              {text}
            </label>
          </div>
        )
      })}
    </form>
  )
}
