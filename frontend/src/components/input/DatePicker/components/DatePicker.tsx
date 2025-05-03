import React from 'react'
import dayjs from 'dayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Variant } from '@enums/ui'
import { TextField } from '@components/input/TextField'
import { useHandleDateChange } from '@hooks/ui'
import { DatePickerProps } from '../typings'

const CustomDatePicker: React.FC<DatePickerProps> = ({
  label,
  attribute,
  setAttribute,
  targetKey,
  required = false,
  disabled = false,
  error = false,
  helperText = '',
  variant = Variant.InputField.OUTLINED,
  fullWidth = true,
  sx = {}
}) => {
  const handleDateChange = useHandleDateChange(setAttribute, targetKey)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={attribute ? dayjs(attribute) : null}
        onChange={handleDateChange}
        disabled={disabled}
        slots={{
          textField: (params) => (
            <TextField
              required={required}
              error={error}
              helperText={error && helperText}
              variant={variant}
              fullWidth={fullWidth}
              sx={sx}
              {...params}
            />
          )
        }}
      />
    </LocalizationProvider>
  )
}

export default CustomDatePicker
