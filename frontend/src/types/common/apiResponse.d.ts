import { ResponseStatus } from '../../enums'

export interface APIResponse {
  status: ResponseStatus
  data: any
  message: string
  error?: string
  timestamp: string
}
