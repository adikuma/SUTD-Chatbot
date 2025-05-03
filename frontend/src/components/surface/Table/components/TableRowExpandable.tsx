import React from 'react'
import { Collapse } from '@mui/material'
import { ExpandLessIcon, ExpandMoreIcon } from '@styles/Icons'
import { Box } from '@components/layout'
import { IconButton } from '@components/input'
import { TableRowExpandableProps } from '../typings'
import * as styles from '../styles'
import { useTable } from '../hooks'

const CustomTableRowExpandable: React.FC<TableRowExpandableProps> = ({
  params,
  expandedRowComponent
}) => {
  const { expandedItems, handleExpandChange, disabled } = useTable()

  const isExpanded: boolean = expandedItems.includes(params.id)

  return (
    <>
      <Box sx={styles.table_row}>
        <Box sx={styles.table_row_content}>{params.value}</Box>

        <IconButton
          icon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          description={isExpanded ? 'Collapse' : 'Expand'}
          onClick={() => handleExpandChange(params.id)(null, !isExpanded)}
          disabled={disabled}
        />
      </Box>

      <Collapse in={isExpanded} timeout='auto' unmountOnExit>
        {expandedRowComponent(params.row)}
      </Collapse>
    </>
  )
}

export default CustomTableRowExpandable
