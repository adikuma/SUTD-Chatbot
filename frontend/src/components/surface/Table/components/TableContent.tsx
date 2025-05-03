import React, { useMemo } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Divider } from '@components/layout'
import { Modal } from '@components/surface/Modal'
import { generateItemsPerPageOptions } from '@utils/handleGeneration'
import { TableContentProps } from '../typings'
import * as styles from '../styles'
import { useTable } from '../hooks'
import TableToolbar from './TableToolbar'
import TableRowExpandable from './TableRowExpandable'

const CustomTableContent: React.FC<TableContentProps> = ({
  dataCount,
  columns,
  rows,
  expandedRowComponent,
  filters,
  bulkActions,
  disableColumnMenu,
  rowHeight,
  sx
}) => {
  const {
    paginateData,
    open,
    handleClose,
    handlePaginationChange,
    handleSortChange,
    handleRowSelectionChange
  } = useTable()

  const itemsPerPageOptions = useMemo<number[]>(
    () => generateItemsPerPageOptions(dataCount),
    [dataCount]
  )

  const mappedColumns = useMemo<any>(
    () =>
      columns.map((column) =>
        column.field === 'expandable'
          ? {
              ...column,
              renderCell: (params: any) => (
                <TableRowExpandable
                  key={params.id}
                  params={params}
                  expandedRowComponent={expandedRowComponent}
                />
              )
            }
          : column
      ),
    [columns, expandedRowComponent]
  )

  return (
    <Box sx={{ ...styles.table, ...sx }}>
      <Modal
        title={'Filters'}
        content={
          <>
            <Divider sx={styles.table_filter_modal_divider} />
            {filters}
          </>
        }
        open={open}
        onClose={handleClose}
      />

      <DataGrid
        getRowId={(row: any) => row._id}
        rows={rows}
        columns={mappedColumns}
        rowCount={dataCount}
        pageSizeOptions={itemsPerPageOptions}
        paginationMode={'server'}
        paginationModel={{
          page: paginateData.page,
          pageSize: paginateData.itemsPerPage
        }}
        onPaginationModelChange={handlePaginationChange}
        sortingMode={'server'}
        disableColumnMenu={disableColumnMenu}
        disableColumnResize={disableColumnMenu}
        onSortModelChange={handleSortChange}
        checkboxSelection={!!bulkActions}
        disableRowSelectionOnClick
        onRowSelectionModelChange={handleRowSelectionChange}
        slots={{ toolbar: TableToolbar }}
        slotProps={{ toolbar: { filters, bulkActions, disableColumnMenu } }}
        rowHeight={rowHeight}
        autoHeight
      />
    </Box>
  )
}

export default CustomTableContent
