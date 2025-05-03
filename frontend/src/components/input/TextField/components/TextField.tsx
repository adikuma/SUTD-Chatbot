import React from 'react'
import { TextField } from '@mui/material'
import { Variant } from '@enums/ui'
import { useHandleNumberChange, useHandleValueChange } from '@hooks/ui'
import { TextFieldProps } from '../typings'

const CustomTextField: React.FC<TextFieldProps> = ({
  label,
  attribute,
  setAttribute,
  type = Variant.TextField.TEXT,
  required = false,
  disabled = false,
  error = false,
  helperText = '',
  min = 0,
  max = 100,
  step = 1,
  variant = Variant.InputField.OUTLINED,
  fullWidth = true,
  sx = {},
  ...otherProps
}) => {
  const handleNumberChange = useHandleNumberChange(setAttribute, min, max)
  const handleTextChange = useHandleValueChange(setAttribute)

  return (
    <TextField
      label={label}
      value={attribute}
      onChange={
        type === Variant.TextField.NUMBER
          ? handleNumberChange
          : handleTextChange
      }
      type={type}
      required={required}
      disabled={disabled}
      error={error}
      helperText={error && helperText}
      inputProps={{ min, max, step }}
      variant={variant}
      fullWidth={fullWidth}
      sx={sx}
      {...otherProps}
    />
  )
}

export default CustomTextField
