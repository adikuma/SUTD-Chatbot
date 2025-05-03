import { ReactNode } from 'react'

export interface AccordionContextProps {
  expandedItems: string[]
  handleExpandChange: (
    item: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void
}

export interface AccordionProps {
  items: AccordionItemProps[]
}

export interface AccordionItemProps {
  id: string
  label: string
  content: ReactNode
  disabled?: boolean
}
