import React from 'react'
import { TableCell, TableRow } from '@mui/material'
import { SimpleTableRowProps } from '../typings'

const CustomSimpleTableRow: React.FC<SimpleTableRowProps> = ({
  headers,
  row
}) => {
  return (
    <TableRow>
      {headers.map((header, cellIndex) => (
        <TableCell key={`${row.id}-${cellIndex}`}>{row[header]}</TableCell>
      ))}
    </TableRow>
  )
}

export default CustomSimpleTableRow
