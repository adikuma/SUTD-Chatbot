import React from 'react'
import { TableCell } from '@mui/material'
import { formatCamelCaseToTitleCase } from '@utils/handleFormats'
import { SimpleTableHeaderProps } from '../typings'

const CustomSimpleTableHeader: React.FC<SimpleTableHeaderProps> = ({
  header
}) => {
  return <TableCell>{formatCamelCaseToTitleCase(header)}</TableCell>
}

export default CustomSimpleTableHeader
