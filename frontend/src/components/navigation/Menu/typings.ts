import { ReactNode } from 'react'

export interface MenuProps {
  anchorEl?: null | HTMLElement
  items: MenuItemProps[]
  open: boolean
  onClose: () => void
}

export interface MenuItemProps {
  primaryLabel: string
  secondaryLabel?: string
  onClick?: () => void
  disabled?: boolean
  icon?: ReactNode
}
