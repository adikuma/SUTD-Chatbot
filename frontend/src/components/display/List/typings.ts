import { ReactNode } from 'react'
import { Orientation, Variant } from '@enums/ui'

export interface ListBaseProps {
  dense?: boolean
  subItemsIndicator?: boolean
}

export interface ListContextProps extends ListBaseProps {
  expandedItems: (number | string)[]
  handleExpandChange: (
    item: number | string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void
  selectedItem: number | string | null
  handleSelectClick: (
    idx: number | string,
    isExpandable: boolean,
    isOpen: boolean,
    onPrimaryClick?: () => void
  ) => void
}

export interface ListProviderProps extends ListBaseProps {
  children: ReactNode
}

export interface ListProps extends ListBaseProps {
  items: ListItemProps[]
  orientation?: Orientation
}

export interface ListItemProps extends ListBaseProps {
  idx?: number | string
  primaryLabel?: string | Variant.List
  secondaryLabel?: string
  subItems?: ListItemProps[]
  primaryIcon?: ReactNode
  secondaryIcon?: ReactNode
  secondaryIconDescription?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
  primaryClickDisabled?: boolean
  secondaryClickDisabled?: boolean
  children?: ReactNode
}

export interface ListItemButtonProps extends ListItemProps {
  isExpandable: boolean
  isOpen: boolean
  itemsCount: number
}

export interface ListItemExpandableProps {
  idx: number | string
  isOpen: boolean
  subItems: ListItemProps[]
}
