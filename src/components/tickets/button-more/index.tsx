import React from 'react'

import { useAppDispatch } from '@hooks/index'
import { addVisibleTickets } from '@store/appSlice'

import styles from './button-more.module.scss'
type ButtonMoreProps = {
  currentLength: number
  neededLength: number
  step: number
  text: string
  className?: string
}

export const ButtonMore = ({ currentLength, neededLength, step, className, text }: ButtonMoreProps) => {
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(addVisibleTickets(step))
  }
  const classNameStyles = className ? `${styles.default} ${className}` : styles.default
  return neededLength >= currentLength ? null : (
    <button className={classNameStyles} onClick={handleClick} type="button">
      {text}
    </button>
  )
}
