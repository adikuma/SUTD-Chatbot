import React from 'react'
import { FormControl, FormHelperText } from '@mui/material'
import { Align, Orientation } from '@enums/ui'
import { Box } from '@components/layout'
import { List, Text } from '@components/display'
import { UploaderProps } from '../typings'
import * as styles from '../styles'
import { useUploader } from '../hooks'

const CustomUploader: React.FC<UploaderProps> = ({
  initialFiles = [],
  onUpload,
  multiple = false,
  required = false,
  disabled = false,
  error = false,
  helperText = '',
  sx = {}
}) => {
  const { getRootProps, getInputProps, returnFileItems } = useUploader(
    initialFiles,
    onUpload,
    multiple,
    disabled
  )

  return (
    <FormControl error={error}>
      <Box sx={{ ...styles.uploader(disabled), ...sx }} {...getRootProps()}>
        <input {...getInputProps()} />

        <Text
          content={`Drag & drop files here, or click to select files ${required ? '*' : ''}`}
          align={Align.CENTER}
        />

        <List items={returnFileItems()} orientation={Orientation.HORIZONTAL} />
      </Box>

      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default CustomUploader
