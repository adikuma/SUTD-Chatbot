import React from 'react'
import { Radio, FormControlLabel } from '@mui/material'
import { RadioGroupItemProps } from '../typings'

const CustomRadioGroupItem: React.FC<RadioGroupItemProps> = ({
  option,
  attribute,
  color
}) => {
  return (
    <FormControlLabel
      label={option.label}
      control={
        <Radio
          value={option.value}
          checked={option.value === attribute}
          color={color}
        />
      }
    />
  )
}

export default CustomRadioGroupItem
