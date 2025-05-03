import React from 'react'
import { Variant } from '@enums/ui'
import { AddIcon, RemoveIcon } from '@styles/Icons'
import { IconButton } from '@components/input/IconButton'
import { TextField } from '@components/input/TextField'
import { Box } from '@components/layout'
import { IncrementorProps } from '../typings'
import * as styles from '../styles'
import { useIncrementor } from '../hooks'

const CustomIncrementor: React.FC<IncrementorProps> = ({
  label,
  attribute,
  setAttribute,
  disabled = false,
  error = false,
  helperText = '',
  min = 0,
  max = 100,
  step = 1,
  sx = {}
}) => {
  const { increment, decrement } = useIncrementor(setAttribute, step)

  return (
    <Box sx={{ ...styles.incrementor, ...sx }}>
      <IconButton
        icon={<RemoveIcon />}
        description={'Subtract quantity'}
        onClick={decrement}
        disabled={disabled || attribute <= min}
      />

      <TextField
        label={label}
        attribute={attribute}
        setAttribute={setAttribute}
        type={Variant.TextField.NUMBER}
        disabled={disabled}
        error={error}
        helperText={error && helperText}
        min={min}
        max={max}
        step={step}
        sx={styles.incrementor_field}
      />

      <IconButton
        icon={<AddIcon />}
        description={'Add quantity'}
        onClick={increment}
        disabled={disabled || attribute >= max}
      />
    </Box>
  )
}

export default CustomIncrementor
