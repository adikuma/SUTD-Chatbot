import { Severity } from '../../enums/ui'

export interface Notification {
  status?: Severity
  message: string
}
