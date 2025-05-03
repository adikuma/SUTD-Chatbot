import React from 'react'
import { Pagination } from '@mui/material'
import { Color, Size, Variant } from '@enums/ui'
import { PaginationProps } from '../typings'

const CustomPagination: React.FC<PaginationProps> = ({
  page,
  itemsPerPage,
  dataCount = 0,
  onChange,
  disabled = false,
  sx = {}
}) => {
  const pageCount: number = Math.ceil(dataCount / itemsPerPage)

  return (
    <Pagination
      page={page}
      count={pageCount}
      onChange={(event, newValue): void => onChange(event, newValue)}
      disabled={disabled}
      variant={Variant.InputField.OUTLINED}
      color={Color.Default.PRIMARY}
      shape={Variant.Pagination.CIRCULAR}
      size={Size.LongSize.MEDIUM}
      sx={sx}
    />
  )
}

export default CustomPagination
