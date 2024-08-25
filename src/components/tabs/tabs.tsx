import React from 'react'

import styles from './tabs.module.scss'

export default function Tabs() {
  return (
    <div className={styles.tabs}>
      <div className={styles.tab_active}>Самый дешевый</div>
      <div className={styles.tab}>Самый быстрый</div>
      <div className={styles.tab}>Оптимальный</div>
    </div>
  )
}
