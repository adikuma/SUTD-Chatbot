import React from 'react'
import { Badge } from '@mui/material'
import { Color, Variant } from '@enums/ui'
import { BadgeProps } from '../typings'

const CustomBadge: React.FC<BadgeProps> = ({ icon, content }) => {
  return (
    <Badge
      badgeContent={content}
      variant={Variant.Default.STANDARD}
      color={Color.Default.PRIMARY}
    >
      {icon}
    </Badge>
  )
}

export default CustomBadge
