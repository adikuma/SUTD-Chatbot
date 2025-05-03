import { SxProps, Theme } from '@mui/material'

export interface SimpleTableProps {
  headers: string[]
  rows: { [key: string]: any }[]
  sx?: SxProps<Theme>
}

export interface SimpleTableHeaderProps {
  header: string
}

export interface SimpleTableRowProps {
  headers: string[]
  row: { [key: string]: any }
}
