import React, { createContext, useContext, useState, useMemo } from 'react'
import { useHandleExpandChange } from '@hooks/ui'
import { ListContextProps, ListProviderProps } from '../typings'

const ListContext = createContext<ListContextProps | undefined>(undefined)

export const ListProvider: React.FC<ListProviderProps> = ({
  children,
  dense,
  subItemsIndicator
}) => {
  const [expandedItems, handleExpandChange] = useHandleExpandChange()
  const [selectedItem, setSelectedItem] = useState<number | string | null>(null)

  const handleSelectClick = (
    idx: number | string,
    isExpandable: boolean,
    isOpen: boolean,
    onPrimaryClick?: () => void
  ): void => {
    if (isExpandable) {
      handleExpandChange(idx)(null, !isOpen)
    } else {
      setSelectedItem(idx)
      onPrimaryClick?.()
    }
  }

  const contextValue = useMemo<ListContextProps>(
    () => ({
      expandedItems,
      handleExpandChange,
      selectedItem,
      handleSelectClick,
      dense,
      subItemsIndicator
    }),
    [expandedItems, handleExpandChange, selectedItem, dense, subItemsIndicator]
  )

  return (
    <ListContext.Provider value={contextValue}>{children}</ListContext.Provider>
  )
}

export const useList = (): ListContextProps => {
  return useContext(ListContext)
}
