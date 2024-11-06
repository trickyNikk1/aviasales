import React, { Component, ErrorInfo, ReactNode } from 'react'

import styles from './error-boundary.module.scss'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true })
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.error}>
          <h1 className={styles.error__title}>Что-то пошло не так. Мы уже работаем над этим.</h1>
        </div>
      )
    }

    return this.props.children
  }
}
