import React from 'react'
import { ListSubheader } from '@mui/material'
import { Variant } from '@enums/ui'
import { Divider } from '@components/layout'
import { formatUppercase } from '@utils/handleFormats'
import { ListItemProps } from '../typings'
import * as styles from '../styles'
import { useList } from '../hooks'
import ListItemButton from './ListItemButton'
import ListItemExpandable from './ListItemExpandable'

const CustomListItem: React.FC<{ item: ListItemProps; itemsCount: number }> = ({
  item,
  itemsCount
}) => {
  const { expandedItems } = useList()

  if (item.primaryLabel === Variant.List.DIVIDER) {
    return <Divider />
  }

  if (item.primaryLabel === Variant.List.HEADER) {
    return (
      <ListSubheader sx={styles.list_subheader}>
        {formatUppercase(item.secondaryLabel)}
      </ListSubheader>
    )
  }

  const isExpandable: boolean = item.subItems && item.subItems.length > 0
  const isOpen: boolean = expandedItems.includes(item.idx)

  return (
    <>
      <ListItemButton
        {...item}
        isExpandable={isExpandable}
        isOpen={isOpen}
        itemsCount={itemsCount}
      />

      {isExpandable && (
        <ListItemExpandable
          idx={item.idx}
          isOpen={isOpen}
          subItems={item.subItems}
        />
      )}
    </>
  )
}

export default CustomListItem
