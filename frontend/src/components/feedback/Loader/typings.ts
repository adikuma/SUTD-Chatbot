import { SxProps, Theme } from '@mui/material'
import { Variant } from '@enums/ui'

export interface LoaderProps {
  type?: Variant.Loader
  label?: string
  sx?: SxProps<Theme>
}
