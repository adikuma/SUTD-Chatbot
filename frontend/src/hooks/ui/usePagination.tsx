import { useMemo, useState } from 'react'
import { PaginateData } from '@typings/common'

interface PaginationContextProps {
  paginateData?: PaginateData
  setPaginateData?: React.Dispatch<React.SetStateAction<PaginateData>>
}

const usePagination = ({
  paginateData,
  setPaginateData
}: Partial<PaginationContextProps>) => {
  const [searchText, setSearchText] = useState<string>(
    paginateData?.searchText || ''
  )

  const handlePaginationChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ): void => {
    setPaginateData({ ...paginateData, page: newPage })
  }

  const handleSearchClick = (): void => {
    setPaginateData({ ...paginateData, searchText, page: 0 })
  }

  return useMemo(
    () => ({
      searchText,
      setSearchText,
      handlePaginationChange,
      handleSearchClick
    }),
    [searchText, paginateData]
  )
}

export default usePagination
