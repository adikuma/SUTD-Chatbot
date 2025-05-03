import React, { createContext, useContext, useState, useMemo } from 'react'
import { GridRowSelectionModel } from '@mui/x-data-grid'
import { useHandleExpandChange, useOpenCloseState } from '@hooks/ui'
import { TableContextProps, TableProviderProps } from '../typings'

const TableContext = createContext<TableContextProps | undefined>(undefined)

export const TableProvider: React.FC<TableProviderProps> = ({
  children,
  rows,
  paginateData,
  setPaginateData,
  selectedRows,
  setSelectedRows,
  disabled
}) => {
  const [expandedItems, handleExpandChange] = useHandleExpandChange()
  const { open, handleOpen, handleClose } = useOpenCloseState(false)

  const [searchText, setSearchText] = useState<string>(
    paginateData?.searchText || ''
  )

  const handlePaginationChange = (newPaginateData: any): void => {
    setPaginateData({
      ...paginateData,
      page: newPaginateData.page,
      itemsPerPage: newPaginateData.pageSize
    })
  }

  const handleSortChange = (newPaginateData: any): void => {
    const { field = null, sort = null } = newPaginateData[0] || {}
    setPaginateData({ ...paginateData, sortBy: field, sortDirection: sort })
  }

  const handleSearchClick = (): void => {
    setPaginateData({ ...paginateData, searchText, page: 0 })
  }

  const handleRowSelectionChange = (
    newSelection: GridRowSelectionModel
  ): void => {
    const selectedRowObjects: any = rows.filter((row: any) =>
      newSelection.includes(row._id)
    )
    setSelectedRows(selectedRowObjects)
  }

  const contextValue = useMemo<TableContextProps>(
    () => ({
      paginateData,
      setPaginateData,
      selectedRows,
      setSelectedRows,
      disabled,
      open,
      handleOpen,
      handleClose,
      searchText,
      setSearchText,
      expandedItems,
      handlePaginationChange,
      handleSortChange,
      handleSearchClick,
      handleExpandChange,
      handleRowSelectionChange
    }),
    [
      paginateData,
      setPaginateData,
      selectedRows,
      setSelectedRows,
      disabled,
      open,
      handleOpen,
      handleClose,
      searchText,
      expandedItems
    ]
  )

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  )
}

export const useTable = (): TableContextProps => {
  return useContext(TableContext)
}
