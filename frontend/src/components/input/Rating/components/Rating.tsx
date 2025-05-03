import React from 'react'
import { Rating, FormControl, FormLabel, FormHelperText } from '@mui/material'
import { Size } from '@enums/ui'
import { useHandleNumericChange } from '@hooks/ui'
import { RatingProps } from '../typings'
import * as styles from '../styles'

const CustomRating: React.FC<RatingProps> = ({
  label,
  attribute,
  setAttribute,
  disabled = false,
  error = false,
  helperText = '',
  readOnly = false,
  precision = 0.5,
  max = 5,
  size = Size.LongSize.MEDIUM,
  sx = {}
}) => {
  const handleRatingChange = useHandleNumericChange(setAttribute)

  return (
    <FormControl
      disabled={disabled}
      error={error}
      sx={{ ...styles.rating, ...sx }}
    >
      <FormLabel>{label}</FormLabel>

      <Rating
        value={attribute}
        onChange={handleRatingChange}
        readOnly={readOnly}
        precision={precision}
        max={max}
        size={size}
      />

      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default CustomRating
