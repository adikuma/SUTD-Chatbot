import { ReactNode } from 'react'
import { SxProps, Theme } from '@mui/material'
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'
import { PaginateData } from '@typings/common'

export interface TableBaseProps {
  rows?: any[]
  paginateData?: PaginateData
  setPaginateData?: React.Dispatch<React.SetStateAction<PaginateData>>
  selectedRows?: any
  setSelectedRows?: React.Dispatch<React.SetStateAction<any[]>>
  disabled?: boolean
}

export interface TableContextProps extends TableBaseProps {
  open: boolean
  handleOpen: () => void
  handleClose: () => void
  searchText: string
  setSearchText: React.Dispatch<React.SetStateAction<string>>
  expandedItems: string[]
  handlePaginationChange: (newPaginateData: any) => void
  handleSortChange: (newPaginateData: any) => void
  handleSearchClick: () => void
  handleExpandChange: (
    item: string
  ) => (event: React.SyntheticEvent | null, isExpanded: boolean) => void
  handleRowSelectionChange: (newSelectedRows: GridRowSelectionModel) => void
}

export interface TableProviderProps extends TableBaseProps {
  children: ReactNode
}

export interface TableContentProps {
  dataCount?: number
  columns: GridColDef[]
  rows?: any[]
  expandedRowComponent?: (row: any) => ReactNode
  filters?: ReactNode
  bulkActions?: ReactNode
  disableColumnMenu?: boolean
  rowHeight?: number
  sx?: SxProps<Theme>
}

export interface TableProps extends TableBaseProps, TableContentProps {}

export interface TableToolbarProps {
  filters?: ReactNode
  bulkActions?: ReactNode
  disableColumnMenu?: boolean
}

export interface TableRowExpandableProps {
  params: any
  expandedRowComponent: (row: any) => ReactNode
}

// COMMON USAGE IN FEATURES
export interface TableRenderCellProps {
  params: any
  disabled?: boolean
}

export interface TableResourceDetailsProps extends TableRenderCellProps {
  open: boolean
  onClose: () => void
}

export interface TableBulkActionsProps {
  selectedRows: any[]
}
