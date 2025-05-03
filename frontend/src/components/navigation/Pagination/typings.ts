import { SxProps, Theme } from '@mui/material'

export interface PaginationProps {
  page: number
  itemsPerPage: number
  dataCount: number
  onChange: (event: React.ChangeEvent<unknown>, newValue: number) => void
  disabled?: boolean
  sx?: SxProps<Theme>
}
