import { useState } from 'react'
import { Severity } from '@enums/ui'
import { Notification } from '@typings/common'

const useNotification = () => {
  const [notification, setNotification] = useState<Notification>({
    status: Severity.SUCCESS,
    message: ''
  })

  const alertNotification = (notification: Notification): void => {
    setNotification({
      status: notification?.status || Severity.SUCCESS,
      message: notification.message
    })
  }

  const resetNotification = (): void => {
    setNotification({ status: Severity.SUCCESS, message: '' })
  }

  return { notification, alertNotification, resetNotification }
}

export default useNotification
