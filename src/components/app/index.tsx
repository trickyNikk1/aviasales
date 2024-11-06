import React from 'react'

import { ReactComponent as Logo } from '@svgs/logo.svg'
import { ErrorBoundary, Filters, Tabs, Tickets, Layout } from '@components/index'

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
