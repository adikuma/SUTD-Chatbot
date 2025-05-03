import React from 'react'
import { ImageList } from '@mui/material'
import { Variant } from '@enums/ui'
import { ImageListProps } from '../typings'
import ImageListItem from './ImageListItem'

const CustomImageList: React.FC<ImageListProps> = ({
  items,
  variant = Variant.Image.STANDARD,
  cols = 1,
  rowHeight = 'auto',
  gap = 4
}) => {
  return (
    <ImageList variant={variant} cols={cols} rowHeight={rowHeight} gap={gap}>
      {items.map((item, idx) => (
        <ImageListItem key={`${item.alt}-${idx}`} item={item} />
      ))}
    </ImageList>
  )
}

export default CustomImageList
