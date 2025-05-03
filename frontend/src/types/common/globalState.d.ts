import { Notification } from './notification'

export interface GlobalState {
  notification: Notification
  alertNotification: (notification: Notification) => void
  resetNotification: () => void
  open: boolean
  handleOpen: () => void
  handleClose: () => void
}
