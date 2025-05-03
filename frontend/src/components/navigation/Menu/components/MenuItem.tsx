import React from 'react'
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { Divider } from '@components/layout'
import { MenuItemProps } from '../typings'

const CustomMenuItem: React.FC<{ item: MenuItemProps }> = ({ item }) => {
  if (item?.onClick === undefined) {
    return <Divider />
  }

  return (
    <MenuItem onClick={item.onClick} disabled={item?.disabled}>
      {item?.icon && <ListItemIcon>{item.icon}</ListItemIcon>}

      <ListItemText
        primary={item.primaryLabel}
        secondary={item?.secondaryLabel}
      />
    </MenuItem>
  )
}

export default CustomMenuItem
