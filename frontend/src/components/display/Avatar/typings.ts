import { ReactNode } from 'react'
import { SxProps, Theme } from '@mui/material'

export interface AvatarProps {
  src?: string
  alt?: string
  icon?: ReactNode
  sx?: SxProps<Theme>
}
