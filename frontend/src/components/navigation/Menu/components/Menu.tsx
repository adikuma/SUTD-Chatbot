import React from 'react'
import { Menu } from '@mui/material'
import { MenuProps } from '../typings'
import MenuItem from './MenuItem'

const CustomMenu: React.FC<MenuProps> = ({
  anchorEl,
  items,
  open,
  onClose
}) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      {items.map((item, idx) => (
        <MenuItem key={`${item.primaryLabel}-${idx}`} item={item} />
      ))}
    </Menu>
  )
}

export default CustomMenu
