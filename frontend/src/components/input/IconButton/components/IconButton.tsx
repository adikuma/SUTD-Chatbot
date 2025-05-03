import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { Color, Size } from '@enums/ui'
import { IconButtonProps } from '../typings'

const CustomIconButton: React.FC<IconButtonProps> = ({
  icon,
  description,
  onClick,
  onMouseDown,
  disabled = false,
  color = Color.DefaultInherit.DEFAULT,
  size = Size.LongSize.MEDIUM,
  edge = false,
  sx = {}
}) => {
  return (
    <Tooltip title={description}>
      <IconButton
        onClick={onClick}
        onMouseDown={onMouseDown}
        disabled={disabled}
        color={color}
        size={size}
        edge={edge}
        sx={sx}
      >
        {icon}
      </IconButton>
    </Tooltip>
  )
}

export default CustomIconButton
