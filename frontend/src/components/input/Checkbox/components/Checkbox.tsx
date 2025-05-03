import React from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText
} from '@mui/material'
import { Color } from '@enums/ui'
import { useHandleCheckChange } from '@hooks/ui'
import { CheckboxProps } from '../typings'

const CustomCheckbox: React.FC<CheckboxProps> = ({
  label,
  attribute,
  setAttribute,
  onChange,
  indeterminate = false,
  disabled = false,
  error = false,
  helperText = '',
  color = Color.Default.PRIMARY,
  sx = {}
}) => {
  const handleCheckChange = useHandleCheckChange(setAttribute)

  return (
    <FormControl component={'fieldset'} error={error} sx={sx}>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            checked={attribute}
            onChange={onChange || handleCheckChange}
            indeterminate={indeterminate}
            disabled={disabled}
            color={color}
          />
        }
      />

      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default CustomCheckbox
