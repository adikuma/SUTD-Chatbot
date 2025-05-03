import React from 'react'
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { Edge } from '@enums/ui'
import { Box } from '@components/layout'
import { IconButton } from '@components/input'
import { DisplayExpandCollapseIcon } from '@utils/handleDisplay'
import { ListItemButtonProps } from '../typings'
import * as styles from '../styles'
import { useList } from '../hooks'

const CustomListItemButton: React.FC<ListItemButtonProps> = ({
  idx,
  primaryLabel,
  secondaryLabel,
  primaryIcon,
  secondaryIcon,
  secondaryIconDescription,
  onPrimaryClick,
  onSecondaryClick,
  primaryClickDisabled,
  secondaryClickDisabled,
  children,
  isExpandable,
  isOpen,
  itemsCount
}) => {
  const { selectedItem, handleSelectClick, dense, subItemsIndicator } =
    useList()

  const modifiedIndex: string = String(idx).split('-').pop()

  return (
    <ListItemButton
      onClick={() =>
        handleSelectClick(idx, isExpandable, isOpen, onPrimaryClick)
      }
      disabled={primaryClickDisabled}
      selected={idx === selectedItem}
      dense={dense}
      sx={styles.list_item(idx === selectedItem)}
    >
      {subItemsIndicator && !primaryIcon && (
        <>
          <Box sx={styles.list_sub_item_divider(modifiedIndex, itemsCount)}>
            <Box
              sx={styles.list_sub_item_indicator(
                modifiedIndex,
                itemsCount,
                idx === selectedItem
              )}
            />
          </Box>
          <ListItemIcon />
        </>
      )}

      {primaryIcon && <ListItemIcon>{primaryIcon}</ListItemIcon>}

      <ListItemText primary={primaryLabel} secondary={secondaryLabel} />

      {isExpandable && <DisplayExpandCollapseIcon isOpen={isOpen} />}

      {secondaryIcon && (
        <ListItem
          secondaryAction={
            <IconButton
              icon={secondaryIcon}
              description={secondaryIconDescription}
              onClick={onSecondaryClick}
              disabled={secondaryClickDisabled}
              edge={Edge.END}
            />
          }
        />
      )}

      {children && <Box sx={styles.list_item_children}>{children}</Box>}
    </ListItemButton>
  )
}

export default CustomListItemButton
