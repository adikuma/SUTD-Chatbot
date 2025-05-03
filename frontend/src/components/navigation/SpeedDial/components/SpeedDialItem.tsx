import React from 'react'
import { SpeedDialAction } from '@mui/material'
import { SpeedDialItemProps } from '../typings'

const CustomSpeedDialItem: React.FC<{ item: SpeedDialItemProps }> = ({
  item
}) => {
  return (
    <SpeedDialAction
      icon={item.icon}
      tooltipTitle={item.description}
      onClick={item.onClick}
    />
  )
}

export default CustomSpeedDialItem
