import React from 'react'
import { SpeedDial, SpeedDialIcon } from '@mui/material'
import { Direction } from '@enums/ui'
import { SpeedDialProps } from '../typings'
import SpeedDialItem from './SpeedDialItem'

const CustomSpeedDial: React.FC<SpeedDialProps> = ({
  items,
  icon = <SpeedDialIcon />,
  openIcon,
  direction = Direction.UP,
  sx = {}
}) => {
  return (
    <SpeedDial
      icon={icon}
      openIcon={openIcon}
      direction={direction}
      sx={sx}
      ariaLabel={'speed-dial'}
    >
      {items.map((item) => (
        <SpeedDialItem key={item.description} item={item} />
      ))}
    </SpeedDial>
  )
}

export default CustomSpeedDial
