import React from 'react'
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField
} from '@mui/material'
import { LabelValue } from '@typings/common'
import { useHandleObjectChange } from '@hooks/ui'
import { SelectProps } from '../typings'

const CustomSelect: React.FC<SelectProps> = ({
  label,
  attribute,
  setAttribute,
  targetKey,
  onChange,
  options,
  isResource = true,
  multiple = false,
  required = false,
  disabled = false,
  error = false,
  helperText = '',
  fullWidth = true,
  sx = {}
}) => {
  const handleSelectChange = useHandleObjectChange(
    setAttribute,
    targetKey,
    isResource
  )

  return (
    <FormControl
      required={required}
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      sx={sx}
    >
      <Autocomplete
        value={options.find(
          (option: LabelValue) => option.value === attribute?.[targetKey]
        )}
        onChange={(event, newValue): void => {
          const value = multiple
            ? newValue.map((item: LabelValue) => item.value)
            : newValue?.value
          onChange
            ? onChange(event, newValue)
            : handleSelectChange(event, value)
        }}
        options={options}
        getOptionLabel={(option) => option.label || ''}
        multiple={multiple}
        renderInput={(params) => <TextField {...params} label={label} />}
      />

      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default CustomSelect
