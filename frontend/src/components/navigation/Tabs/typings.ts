import { ReactNode } from 'react'
import { SxProps, Theme } from '@mui/material'
import { Orientation, Variant } from '@enums/ui'

export interface TabsProps {
  items: TabsItemProps[]
  variant?: Variant.Tabs
  orientation?: Orientation
  showScrollButtons?: boolean
  allowScrollButtonsMobile?: boolean
  sx?: SxProps<Theme>
}

export interface TabsItemProps {
  label: string
  content: ReactNode
  disabled?: boolean
}
