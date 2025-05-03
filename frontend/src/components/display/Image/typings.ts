import { SxProps, Theme } from '@mui/material'

export interface ImageProps {
  src: string
  srcSet?: string
  alt: string
  onClick?: () => void
  sx?: SxProps<Theme>
}
