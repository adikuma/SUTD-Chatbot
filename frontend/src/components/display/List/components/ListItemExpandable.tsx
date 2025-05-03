import React from 'react'
import { List, Collapse } from '@mui/material'
import { ListItemExpandableProps } from '../typings'
import ListItem from './ListItem'

const CustomListItemExpandable: React.FC<ListItemExpandableProps> = ({
  idx,
  isOpen,
  subItems
}) => (
  <Collapse in={isOpen} timeout={'auto'} unmountOnExit>
    <List component={'div'} disablePadding>
      {subItems.map((subItem, subIndex) => (
        <ListItem
          key={`${subItem.primaryLabel}-${subIndex}`}
          item={{ ...subItem, idx: `${idx}-${subIndex}` }}
          itemsCount={subItems.length}
        />
      ))}
    </List>
  </Collapse>
)

export default CustomListItemExpandable
