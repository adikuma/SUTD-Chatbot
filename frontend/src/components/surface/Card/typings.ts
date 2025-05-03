import { ReactNode } from 'react'
import { SxProps, Theme } from '@mui/material'

export interface CardProps {
  imageUrl?: string
  title?: string
  content?: ReactNode
  actions?: ReactNode
  sx?: SxProps<Theme>
}
