import { SxProps, Theme } from '@mui/material'
import { Variant } from '@enums/ui'

export interface SearchProps {
  label?: string
  attribute: string
  setAttribute: (searchText: string) => void
  onSearch: () => void
  required?: boolean
  disabled?: boolean
  error?: boolean
  helperText?: string
  variant?: Variant.InputField
  fullWidth?: boolean
  sx?: SxProps<Theme>
}
