import React from 'react'

import styles from './alert.module.scss'

interface AlertProps {
  type: 'error' | 'info'
  title: string
  text: string
}

export const Alert: React.FC<AlertProps> = ({ type, title, text }) => {
  switch (type) {
    case 'error':
      return (
        <div className={styles.error}>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      )
    case 'info':
      return (
        <div className={styles.info}>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      )
    default:
      return null
  }
}
