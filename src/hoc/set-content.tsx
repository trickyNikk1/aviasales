import React from 'react'
import { SerializedError } from '@reduxjs/toolkit'

import type { loadingType } from '@my-types/index'
import { Alert } from '@components/alert'
import { CustomLoader } from '@components/custom-loader'

type SetContentProps = {
  children: React.ReactNode
  status: loadingType | 'no-results'
  error?: SerializedError | null
}
export const SetContent = ({ children, status, error }: SetContentProps) => {
  switch (status) {
    case 'idle':
      return children
    case 'pending':
      return (
        <>
          <CustomLoader />
          {children}
        </>
      )
    case 'failed':
      return <Alert type="error" title={error?.name || 'Error'} text={error?.message || 'Something went wrong'} />
    case 'succeeded':
      return children
    case 'no-results':
      return (
        <Alert
          type="info"
          title="Нет результатов"
          text="Нет результатов по вашему запросу. Попробуйте добавить или изменить фильтры."
        />
      )
    default:
      return null
  }
}
