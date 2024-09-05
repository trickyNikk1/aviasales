import React, { useEffect } from 'react'

import { useAppDispatch } from '../../hook'
import { fetchSearchId } from '../../store/appSlice'
import Tickets from '../tickets'
import Filters from '../filters'
import Tabs from '../tabs'
import { ReactComponent as Logo } from '../logo/logo.svg'

import styles from './app.module.scss'

export default function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchSearchId())
  }, [dispatch])
  return (
    <>
      <header className={styles.header}>
        <Logo className={styles.logo}></Logo>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <Filters />
          <div className={styles.container__inner}>
            <Tabs />
            <Tickets />
          </div>
        </div>
      </main>
    </>
  )
}
