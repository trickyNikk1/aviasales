import React from 'react'

import ErrorBoundary from '../error-boundary'
import Tickets from '../tickets'
import Filters from '../filters'
import Tabs from '../tabs'
import { ReactComponent as Logo } from '../logo/logo.svg'

import styles from './app.module.scss'

export default function App() {
  return (
    <>
      <ErrorBoundary>
        <header className={styles.header}>
          <ErrorBoundary>
            <Logo className={styles.logo} />
          </ErrorBoundary>
        </header>
        <main className={styles.main}>
          <div className={styles.container}>
            <ErrorBoundary>
              <Filters />
            </ErrorBoundary>
            <div className={styles.container__inner}>
              <ErrorBoundary>
                <Tabs />
              </ErrorBoundary>
              <ErrorBoundary>
                <Tickets />
              </ErrorBoundary>
            </div>
          </div>
        </main>
      </ErrorBoundary>
    </>
  )
}
