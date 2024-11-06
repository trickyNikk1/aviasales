import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@hooks/index'
import { setTab, updateTab } from '@store/appSlice'

import type { TabType } from '../../types'

import { tabsData } from './data'
import styles from './tabs.module.scss'

export function Tabs() {
  const active = useAppSelector((state) => state.app.tab)
  const tickets = useAppSelector((state) => state.app.tickets)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setTab(active))
  }, [dispatch, tickets])

  const changeActiveTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setTab(event.currentTarget.id as TabType))
    dispatch(updateTab())
  }
  const { tabs, tab, tab_active } = styles

  return (
    <div className={tabs}>
      {tabsData.map((tabData) => (
        <button
          className={active === tabData.name ? tab_active : tab}
          key={tabData.name}
          id={tabData.name}
          type="button"
          onClick={changeActiveTab}
          disabled={active === tabData.name}
        >
          {tabData.text}
        </button>
      ))}
    </div>
  )
}
