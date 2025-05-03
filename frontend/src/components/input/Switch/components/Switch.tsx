import React from 'react'
import {
  Switch,
  FormControl,
  FormControlLabel,
  FormHelperText
} from '@mui/material'
import { Color } from '@enums/ui'
import { useHandleCheckChange } from '@hooks/ui'
import { SwitchProps } from '../typings'

const CustomSwitch: React.FC<SwitchProps> = ({
  label,
  attribute,
  setAttribute,
  disabled = false,
  error = false,
  helperText = '',
  color = Color.Default.PRIMARY,
  sx = {}
}) => {
  const handleCheckChange = useHandleCheckChange(setAttribute)

  return (
    <FormControl error={error}>
      <FormControlLabel
        label={label}
        control={
          <Switch
            checked={attribute}
            onChange={handleCheckChange}
            disabled={disabled}
            color={color}
            sx={sx}
          />
        }
      />

      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default CustomSwitch
