import React from 'react'
import { Typography } from '@mui/material'
import { Align, Color, Variant } from '@enums/ui'
import { TextProps } from '../typings'

const CustomText: React.FC<TextProps> = ({
  content,
  variant = Variant.Text.BODY1,
  color = Color.Text.DEFAULT,
  align = Align.LEFT,
  sx = {}
}) => {
  return (
    <Typography variant={variant} color={color} align={align} sx={sx}>
      {content}
    </Typography>
  )
}

export default CustomText
