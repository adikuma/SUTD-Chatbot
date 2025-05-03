import React from 'react'
import { RangeOperation } from '@enums'
import { Variant } from '@enums/ui'
import { LabelValue } from '@typings/common'
import { Text } from '@components/display'
import { Select } from '@components/input/Select'
import { TextField } from '@components/input/TextField'
import { Box } from '@components/layout'
import { formatLowercase, formatUnderscoreToSpace } from '@utils/handleFormats'
import { isNumber } from '@utils/handleValidation'
import { ValueRangeProps } from '../typings'
import * as styles from '../styles'

const CustomValueRange: React.FC<ValueRangeProps> = ({
  label,
  attribute,
  setAttribute,
  disabled,
  helperText = '',
  constraints,
  spaceBetween = false,
  sx = {}
}) => {
  const options: LabelValue[] = Object.values(RangeOperation).map(
    (operation): LabelValue => ({
      label: formatLowercase(formatUnderscoreToSpace(operation)),
      value: operation
    })
  )

  const isWithinRangeOptionSelected =
    attribute.rangeOperation === RangeOperation.BETWEEN

  const value1Error: boolean =
    attribute.value1 !== undefined && !isNumber(attribute.value1)
  const value2Error: boolean =
    attribute.value2 !== undefined && !isNumber(attribute.value2)

  return (
    <Box sx={sx}>
      <Text content={`${label} is:`} sx={styles.value_range_title} />

      <Box sx={styles.value_range(spaceBetween)}>
        <Box sx={styles.value_range_operation(spaceBetween)}>
          <Select
            label={'Operation'}
            attribute={attribute}
            setAttribute={setAttribute}
            targetKey={'rangeOperation'}
            options={options}
            isResource={false}
            disabled={disabled}
            fullWidth
          />
        </Box>

        <Box sx={styles.value_range_input_container}>
          <TextField
            attribute={attribute.value1}
            setAttribute={(newValue) =>
              setAttribute((prev) => ({ ...prev, value1: newValue }))
            }
            type={Variant.TextField.NUMBER}
            disabled={disabled}
            error={value1Error}
            helperText={value1Error && helperText}
            min={constraints?.min?.[0]}
            max={constraints?.max?.[0]}
            step={constraints?.step?.[0]}
            fullWidth={false}
          />

          <Text
            content={'to'}
            sx={styles.value_range_input(isWithinRangeOptionSelected)}
          />

          <TextField
            attribute={attribute.value2}
            setAttribute={(newValue) =>
              setAttribute((prev) => ({ ...prev, value2: newValue }))
            }
            type={Variant.TextField.NUMBER}
            disabled={disabled}
            error={value2Error}
            helperText={value2Error && helperText}
            min={constraints?.min?.[1]}
            max={constraints?.max?.[1]}
            step={constraints?.step?.[1]}
            fullWidth={false}
            sx={styles.value_range_input(isWithinRangeOptionSelected)}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default CustomValueRange
