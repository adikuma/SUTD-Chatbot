import React, { createContext, useContext, useMemo, ReactNode } from 'react'
import { useHandleExpandChange } from '@hooks/ui'
import { AccordionContextProps } from '../typings'

const AccordionContext = createContext<AccordionContextProps | undefined>(
  undefined
)

export const AccordionProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [expandedItems, handleExpandChange] = useHandleExpandChange()

  const contextValue = useMemo<AccordionContextProps>(
    () => ({
      expandedItems,
      handleExpandChange
    }),
    [expandedItems, handleExpandChange]
  )

  return (
    <AccordionContext.Provider value={contextValue}>
      {children}
    </AccordionContext.Provider>
  )
}

export const useAccordion = (): AccordionContextProps => {
  return useContext(AccordionContext)
}
