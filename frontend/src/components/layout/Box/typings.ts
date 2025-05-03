import { ReactNode } from 'react'
import { SxProps, Theme } from '@mui/material'

export interface BoxProps {
  children?: ReactNode
  onClick?: () => void
  sx?: SxProps<Theme>
}
