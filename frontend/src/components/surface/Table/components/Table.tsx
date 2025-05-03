import React from 'react'
import { TableProps } from '../typings'
import { TableProvider } from '../hooks'
import TableContent from './TableContent'

const CustomTable: React.FC<TableProps> = ({
  paginateData,
  setPaginateData,
  selectedRows,
  setSelectedRows,
  dataCount = 0,
  columns,
  rows,
  expandedRowComponent,
  filters,
  bulkActions,
  disabled = false,
  disableColumnMenu = false,
  rowHeight,
  sx = {}
}) => {
  return (
    <TableProvider
      rows={rows}
      paginateData={paginateData}
      setPaginateData={setPaginateData}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      disabled={disabled}
    >
      <TableContent
        dataCount={dataCount}
        columns={columns}
        rows={rows}
        expandedRowComponent={expandedRowComponent}
        filters={filters}
        bulkActions={bulkActions}
        disableColumnMenu={disableColumnMenu}
        rowHeight={rowHeight}
        sx={sx}
      />
    </TableProvider>
  )
}

export default CustomTable
