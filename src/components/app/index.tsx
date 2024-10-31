import React from 'react'

import { ReactComponent as Logo } from '../logo/logo.svg'
import { ErrorBoundary, Filters, Tabs, Tickets, Layout } from '../index'

import styles from './app.module.scss'

export function App() {
  return (
    <ErrorBoundary>
      <Layout
        headerInner={<Logo className={styles.logo} />}
        sideInner={<Filters />}
        mainInner={
          <>
            <Tabs />
            <Tickets />
          </>
        }
      />
    </ErrorBoundary>
  )
}
