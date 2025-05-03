import React from 'react'
import { Chip } from '@mui/material'
import { Color, Variant } from '@enums/ui'
import { ChipProps } from '../typings'

const CustomChip: React.FC<ChipProps> = ({
  label,
  clickable = false,
  onClick,
  onDelete,
  disabled = false,
  variant = Variant.Chip.FILLED,
  color = Color.Default.DEFAULT,
  avatar,
  icon,
  sx = {}
}) => {
  return (
    <Chip
      label={label}
      clickable={clickable}
      onClick={onClick}
      onDelete={onDelete}
      disabled={disabled}
      variant={variant}
      color={color}
      avatar={avatar}
      icon={icon}
      sx={sx}
    />
  )
}

export default CustomChip
