import React from 'react'
import { Divider } from '@mui/material'
import { Orientation, Variant } from '@enums/ui'
import { DividerProps } from '../typings'

const CustomDivider: React.FC<DividerProps> = ({
  variant = Variant.Divider.FULL_WIDTH,
  orientation = Orientation.HORIZONTAL,
  sx = {}
}) => {
  return <Divider variant={variant} orientation={orientation} sx={sx} />
}

export default CustomDivider
