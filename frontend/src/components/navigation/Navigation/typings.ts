import { ListItemProps } from '@components/display'

export interface MobileDrawerProps {
  items: ListItemProps[]
  isMobile: boolean
  open: boolean
  handleClose: () => void
  subItemsIndicator?: boolean
}

export interface MobileToolbarProps {
  handleOpen: () => void
}
