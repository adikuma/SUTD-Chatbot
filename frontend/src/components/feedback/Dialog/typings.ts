import { ReactNode } from 'react'
import { SxProps, Theme } from '@mui/material'
import { Size } from '@enums/ui'

export interface DialogProps {
  title: string
  content: ReactNode
  actions: ReactNode
  open: boolean
  onClose: () => void
  fullWidth?: boolean
  maxWidth?: Size.ShortSize
  sx?: SxProps<Theme>
}
