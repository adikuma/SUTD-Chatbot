import { SxProps, Theme } from '@mui/material'
import { Orientation, Variant } from '@enums/ui'

export interface DividerProps {
  variant?: Variant.Divider
  orientation?: Orientation
  sx?: SxProps<Theme>
}
