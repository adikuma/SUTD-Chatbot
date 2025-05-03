import React from 'react'
import { Size, Variant } from '@enums/ui'
import { SearchIcon } from '@styles/Icons'
import { Box } from '@components/layout'
import { IconButton } from '@components/input/IconButton'
import { TextField } from '@components/input/TextField'
import { SearchProps } from '../typings'
import * as styles from '../styles'

const CustomSearch: React.FC<SearchProps> = ({
  label = 'Search',
  attribute,
  setAttribute,
  onSearch,
  required = false,
  disabled = false,
  error = false,
  helperText = '',
  variant = Variant.InputField.OUTLINED,
  fullWidth = true,
  sx = {}
}) => {
  return (
    <Box sx={{ ...styles.search(fullWidth), ...sx }}>
      <TextField
        label={label}
        attribute={attribute}
        setAttribute={setAttribute}
        type={Variant.TextField.SEARCH}
        required={required}
        disabled={disabled}
        error={error}
        helperText={error && helperText}
        variant={variant}
        fullWidth={fullWidth}
        sx={styles.search_field}
      />

      <IconButton
        icon={<SearchIcon />}
        description={'Search'}
        onClick={onSearch}
        disabled={disabled}
        size={Size.LongSize.LARGE}
        sx={styles.search_icon_button}
      />
    </Box>
  )
}

export default CustomSearch
