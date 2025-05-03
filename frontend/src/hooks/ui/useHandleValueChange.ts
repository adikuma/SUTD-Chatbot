import { ChangeEvent } from 'react'

const useHandleValueChange = (
  setAttribute: React.Dispatch<React.SetStateAction<any>>
) => {
  const handleValueChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setAttribute(event.target.value)
  }

  return handleValueChange
}

export default useHandleValueChange
