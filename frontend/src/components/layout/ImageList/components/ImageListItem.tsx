import React from 'react'
import { ImageListItem } from '@mui/material'
import { Image } from '@components/display'
import { ImageListItemProps } from '../typings'
import * as styles from '../styles'

const CustomImageListItem: React.FC<{ item: ImageListItemProps }> = ({
  item
}) => {
  return (
    <ImageListItem
      cols={item?.cols || 1}
      rows={item?.rows || 1}
      sx={styles.image_list_item}
    >
      <Image
        src={`${item.src}?w=248&fit=crop&auto=format`}
        srcSet={`${item.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
        alt={item.alt}
        sx={styles.image_list_item_content}
      />
    </ImageListItem>
  )
}

export default CustomImageListItem
