import React from 'react'

import styles from './layout.module.scss'
type LayoutPropsType = {
  headerInner?: React.ReactNode
  sideInner?: React.ReactNode
  mainInner?: React.ReactNode
}

export function Layout({ headerInner = null, sideInner = null, mainInner = null }: LayoutPropsType) {
  return (
    <>
      <header className={styles.header}>{headerInner}</header>
      <main className={styles.main}>
        <div className={styles.container}>
          {sideInner}
          <div className={styles.container__inner}>{mainInner}</div>
        </div>
      </main>
    </>
  )
}
