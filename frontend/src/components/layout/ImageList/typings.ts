import { Variant } from '@enums/ui'

export interface ImageListProps {
  items: ImageListItemProps[]
  variant?: Variant.Image
  cols?: number
  rowHeight?: number | 'auto'
  gap?: number
}

export interface ImageListItemProps {
  src: string
  alt: string
  cols?: number
  rows?: number
}
