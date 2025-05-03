import React from 'react'
import { Alert, AlertTitle } from '@mui/material'
import { Variant } from '@enums/ui'
import { formatSentenceCase } from '@utils/handleFormats'
import { AlertProps } from '../typings'

const CustomAlert: React.FC<AlertProps> = ({ severity, content }) => {
  return (
    <Alert severity={severity} variant={Variant.Default.STANDARD}>
      <AlertTitle>{formatSentenceCase(severity)}</AlertTitle>
      {content}
    </Alert>
  )
}

export default CustomAlert
