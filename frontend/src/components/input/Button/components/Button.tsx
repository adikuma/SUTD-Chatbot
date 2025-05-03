import React from 'react'
import { Button } from '@mui/material'
import { Align, Color, Size, Variant } from '@enums/ui'
import { Text } from '@components/display'
import { ButtonProps } from '../typings'
import * as styles from '../styles'

const CustomButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  variant = Variant.Button.CONTAINED,
  color = Color.Inherit.PRIMARY,
  size = Size.LongSize.MEDIUM,
  startIcon,
  endIcon,
  sx = {}
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      color={color}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{ ...styles.button(variant), ...sx }}
      disableRipple={variant === Variant.Button.TEXT}
    >
      <Text
        content={label}
        variant={Variant.Text.BUTTON}
        align={Align.CENTER}
        sx={{ textTransform: 'none' }}
      />
    </Button>
  )
}

export default CustomButton
