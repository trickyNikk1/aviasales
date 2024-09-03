import React from 'react'

import { useAppDispatch, useAppSelector } from '../../hook'
import { setTab } from '../../store/appSlice'
import type { TabType } from '../../store/appSlice'

import styles from './tabs.module.scss'

export default function Tabs() {
  const active = useAppSelector((state) => state.app.tab)
  const dispatch = useAppDispatch()
  const changeActiveTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setTab(event.currentTarget.id as TabType))
  }
  const { tabs, tab, tab_active } = styles
  return (
    <div className={tabs}>
      <button
        className={active === 'cheapest' ? tab_active : tab}
        id="cheapest"
        type="button"
        onClick={changeActiveTab}
        disabled={active === 'cheapest'}
      >
        Самый дешевый
      </button>
      <button
        className={active === 'fastest' ? tab_active : tab}
        id="fastest"
        type="button"
        onClick={changeActiveTab}
        disabled={active === 'fastest'}
      >
        Самый быстрый
      </button>
      <button
        className={active === 'optimal' ? tab_active : tab}
        id="optimal"
        type="button"
        onClick={changeActiveTab}
        disabled={active === 'optimal'}
      >
        Оптимальный
      </button>
    </div>
  )
}
