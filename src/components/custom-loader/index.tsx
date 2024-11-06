import React from 'react'

import { ReactComponent as Loader } from '@svgs/loader.svg'

import styles from './custom-loader.module.scss'

export const CustomLoader: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Loader className={styles.loader} />
    </div>
  )
}
