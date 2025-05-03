import { useState, useCallback } from 'react'

const useOpenCloseState = (initialState = true) => {
  const [open, setOpen] = useState<boolean>(initialState)

  const handleOpen = useCallback((): void => {
    setOpen(true)
  }, [])

  const handleClose = useCallback((): void => {
    setOpen(false)
  }, [])

  return { open, handleOpen, handleClose }
}

export default useOpenCloseState
