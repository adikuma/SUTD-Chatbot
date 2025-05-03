import React from 'react'
import {
  RadioGroup,
  FormControl,
  FormLabel,
  FormHelperText
} from '@mui/material'
import { Color } from '@enums/ui'
import { useHandleValueChange } from '@hooks/ui'
import { RadioGroupProps } from '../typings'
import RadioGroupItem from './RadioGroupItem'

const CustomRadioGroup: React.FC<RadioGroupProps> = ({
  label,
  attribute,
  setAttribute,
  options,
  required = false,
  disabled = false,
  error = false,
  helperText = '',
  rowDisplay = false,
  color = Color.Default.PRIMARY,
  sx = {}
}) => {
  const handleSelectChange = useHandleValueChange(setAttribute)

  return (
    <FormControl
      component={'fieldset'}
      required={required}
      disabled={disabled}
      error={error}
      sx={sx}
    >
      <FormLabel component={'legend'}>{label}</FormLabel>

      <RadioGroup
        value={attribute}
        onChange={handleSelectChange}
        row={rowDisplay}
        name={label}
      >
        {options.map((option, idx) => (
          <RadioGroupItem
            key={`${option.value}-${idx}`}
            option={option}
            attribute={attribute}
            color={color}
          />
        ))}
      </RadioGroup>

      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default CustomRadioGroup
