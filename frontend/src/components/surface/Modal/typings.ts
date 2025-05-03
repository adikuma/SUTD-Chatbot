import { ReactNode } from 'react'
import { SxProps, Theme } from '@mui/material'

export interface ModalProps {
  title?: string
  content: ReactNode
  leftActions?: ReactNode
  rightActions?: ReactNode
  open: boolean
  onClose: () => void
  sx?: SxProps<Theme>
}
