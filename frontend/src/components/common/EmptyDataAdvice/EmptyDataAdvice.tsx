import { Button, Typography } from '@mui/material'
import styles from './EmptyDataAdvice.module.css'
import { ReactNode } from 'react'

const DEFAULT_TEXT = "No se encontraron datos.\nIntentelo de nuevo más tarde."

type Props = {
    actionButton?: {
      label: string,
      action: ()=> void
    },
    children?:ReactNode
}

const EmptyDataAdvice = ({children=DEFAULT_TEXT, actionButton}:Props) => {
  return (
    <div className={styles.adviceWrapper}>
      <Typography variant='overline'>{children}</Typography>
      {actionButton && <Button size='small' onClick={actionButton.action}>{actionButton.label}</Button>}
    </div>
  )
}

export default EmptyDataAdvice