import React from 'react'
import { DateRangeMode } from '@enums'
import { Variant } from '@enums/ui'
import { LabelValue } from '@typings/common'
import { Select } from '@components/input/Select'
import { Box } from '@components/layout'
import { formatCamelCaseToTitleCase } from '@utils/handleFormats'
import { DatePickerProps } from '../typings'
import * as styles from '../styles'
import DatePicker from './DatePicker'

const CustomDateRangePicker: React.FC<DatePickerProps> = ({
  attribute,
  setAttribute,
  options = Object.values(DateRangeMode),
  required = false,
  disabled = false,
  error = false,
  helperText = '',
  variant = Variant.InputField.OUTLINED,
  fullWidth = true,
  sx = {}
}) => {
  const filteredOptions: LabelValue[] = options.map(
    (filterBy): LabelValue => ({
      label: formatCamelCaseToTitleCase(filterBy),
      value: filterBy
    })
  )

  return (
    <Box sx={{ ...styles.date_range_picker, ...sx }}>
      <Select
        label={'Filter By'}
        attribute={attribute}
        setAttribute={setAttribute}
        targetKey={'filterBy'}
        options={filteredOptions}
        isResource={false}
        disabled={disabled}
      />

      <DatePicker
        label={'Start Date'}
        attribute={attribute.startDate}
        setAttribute={setAttribute}
        targetKey={'startDate'}
        required={required}
        disabled={disabled}
        error={error}
        helperText={error && helperText}
        variant={variant}
        fullWidth={fullWidth}
      />

      <DatePicker
        label={'End Date'}
        attribute={attribute.endDate}
        setAttribute={setAttribute}
        targetKey={'endDate'}
        required={required}
        disabled={disabled}
        error={error}
        helperText={error && helperText}
        variant={variant}
        fullWidth={fullWidth}
      />
    </Box>
  )
}

export default CustomDateRangePicker
