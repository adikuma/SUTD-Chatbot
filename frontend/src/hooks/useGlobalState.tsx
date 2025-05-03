import { createContext, useContext, ReactNode } from 'react'
import { GlobalState } from '@typings/common'
import { useNotification } from './globalStates'
import { useOpenCloseState } from './ui'

const GlobalStateContext = createContext<GlobalState | undefined>(undefined)

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const { notification, alertNotification, resetNotification } =
    useNotification()
  const { open, handleOpen, handleClose } = useOpenCloseState()

  const contextValue: GlobalState = {
    notification,
    alertNotification,
    resetNotification,
    open,
    handleOpen,
    handleClose
  }

  return (
    <GlobalStateContext.Provider value={contextValue}>
      {children}
    </GlobalStateContext.Provider>
  )
}

export const useGlobalState = (): GlobalState => {
  const context = useContext(GlobalStateContext)

  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider')
  }

  return context
}
