import React from 'react'
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
import { FilterListIcon } from '@styles/Icons'
import { Box } from '@components/layout'
import { IconButton, Search } from '@components/input'
import { TableToolbarProps } from '../typings'
import * as styles from '../styles'
import { useTable } from '../hooks'

const CustomTableToolbar: React.FC<TableToolbarProps | any> = ({
  filters,
  bulkActions,
  disableColumnMenu
}) => {
  const {
    selectedRows,
    searchText,
    setSearchText,
    handleSearchClick,
    handleOpen,
    disabled
  } = useTable()

  return (
    <GridToolbarContainer>
      <Box sx={styles.bulk_actions(selectedRows?.length > 0)}>
        {bulkActions}
      </Box>

      <Box sx={styles.table_toolbar(selectedRows?.length === 0)}>
        <Search
          attribute={searchText}
          setAttribute={setSearchText}
          onSearch={handleSearchClick}
          disabled={disabled}
          fullWidth
          sx={styles.table_search}
        />
        <IconButton
          icon={<FilterListIcon />}
          description={'Filter'}
          onClick={handleOpen}
          disabled={disabled}
          sx={styles.table_filter_button(filters)}
        />
        {!disableColumnMenu && (
          <GridToolbarExport csvOptions={{ fileName: 'exported_csv' }} />
        )}
      </Box>
    </GridToolbarContainer>
  )
}

export default CustomTableToolbar
