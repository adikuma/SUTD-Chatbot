import React from 'react'
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import { SimpleTableProps } from '../typings'
import SimpleTableHeader from './SimpleTableHeader'
import SimpleTableRow from './SimpleTableRow'

const CustomSimpleTable: React.FC<SimpleTableProps> = ({
  headers,
  rows,
  sx = {}
}) => {
  return (
    <TableContainer component={Paper} sx={sx}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <SimpleTableHeader key={header} header={header} />
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <SimpleTableRow key={row.id} headers={headers} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CustomSimpleTable
