import { MouseEvent } from 'react'

const useHandleMouseDown = () => {
  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
  }

  return handleMouseDown
}

export default useHandleMouseDown
