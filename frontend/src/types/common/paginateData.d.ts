import { SortDirection } from '../../enums'

export interface PaginateData {
  itemsPerPage?: number
  page?: number
  searchText?: string
  sortBy?: string
  sortDirection?: SortDirection
}
