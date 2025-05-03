import React from 'react'
import { InputAdornment } from '@mui/material'
import { Edge, Variant } from '@enums/ui'
import { Visibility, VisibilityOff } from '@styles/Icons'
import { IconButton } from '@components/input/IconButton'
import { TextField } from '@components/input/TextField'
import { useHandleMouseDown } from '@hooks/ui'
import { PasswordFieldProps } from '../typings'
import { usePasswordField } from '../hooks'

const CustomPasswordField: React.FC<PasswordFieldProps> = ({
  label = 'Password',
  attribute,
  setAttribute,
  required = false,
  disabled = false,
  error = false,
  helperText = '',
  variant = Variant.InputField.OUTLINED,
  fullWidth = true,
  sx = {}
}) => {
  const handleMouseDown = useHandleMouseDown()
  const { showPassword, togglePasswordVisibility } = usePasswordField()

  return (
    <TextField
      label={label}
      attribute={attribute}
      setAttribute={setAttribute}
      type={showPassword ? Variant.TextField.TEXT : Variant.TextField.PASSWORD}
      required={required}
      disabled={disabled}
      error={error}
      helperText={error && helperText}
      variant={variant}
      fullWidth={fullWidth}
      sx={sx}
      InputProps={{
        endAdornment: (
          <InputAdornment position={Edge.END}>
            <IconButton
              icon={showPassword ? <VisibilityOff /> : <Visibility />}
              description={showPassword ? 'Hide password' : 'Show password'}
              onClick={togglePasswordVisibility}
              onMouseDown={handleMouseDown}
              edge={Edge.END}
            />
          </InputAdornment>
        )
      }}
    />
  )
}

export default CustomPasswordField
