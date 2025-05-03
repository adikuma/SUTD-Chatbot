import React from 'react'
import { List } from '@mui/material'
import { Orientation } from '@enums/ui'
import { ListProps } from '../typings'
import * as styles from '../styles'
import { ListProvider } from '../hooks'
import ListItem from './ListItem'

const CustomList: React.FC<ListProps> = ({
  items,
  orientation = Orientation.VERTICAL,
  dense = true,
  subItemsIndicator = false
}) => {
  return (
    <ListProvider dense={dense} subItemsIndicator={subItemsIndicator}>
      <List sx={{ ...styles.list(orientation) }}>
        {items.map((item, idx) => (
          <ListItem
            key={`${item.primaryLabel}-${idx}`}
            item={{ ...item, idx, dense }}
            itemsCount={items.length}
          />
        ))}
      </List>
    </ListProvider>
  )
}

export default CustomList
