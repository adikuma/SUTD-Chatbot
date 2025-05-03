import React from 'react'
import { Slider, FormControl, FormLabel, FormHelperText } from '@mui/material'
import { LabelVisibility } from '@enums/ui'
import { useHandleNumericChange } from '@hooks/ui'
import { SliderProps } from '../typings'
import * as styles from '../styles'

const CustomSlider: React.FC<SliderProps> = ({
  label,
  attribute,
  setAttribute,
  required = false,
  disabled = false,
  error = false,
  helperText = '',
  min = 0,
  max = 100,
  step,
  marks,
  labelVisibility = LabelVisibility.ON,
  sx = {}
}) => {
  const handleSliderChange = useHandleNumericChange(setAttribute)

  return (
    <FormControl
      required={required}
      disabled={disabled}
      error={error}
      sx={{ ...styles.slider, ...sx }}
    >
      <FormLabel>{label}</FormLabel>

      <Slider
        value={attribute}
        onChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
        marks={marks}
        valueLabelDisplay={labelVisibility}
      />

      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default CustomSlider
