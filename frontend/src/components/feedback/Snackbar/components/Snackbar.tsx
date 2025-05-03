import React from 'react'
import { Snackbar } from '@mui/material'
import { Alert } from '@components/feedback/Alert'
import { useGlobalState } from '@hooks'
import { useTimer } from '@hooks/ui'

const autoHideDuration = 5000

const CustomSnackbar: React.FC = () => {
  const { notification, resetNotification } = useGlobalState()

  useTimer(!!notification.message, resetNotification, autoHideDuration)

  return (
    <Snackbar
      open={!!notification.message}
      onClose={resetNotification}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert severity={notification.status} content={notification.message} />
    </Snackbar>
  )
}

export default CustomSnackbar
