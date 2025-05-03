import { ChangeEvent } from 'react'

const useHandleCheckChange = (
  setAttribute: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const handleCheckChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setAttribute(event.target.checked)
  }

  return handleCheckChange
}

export default useHandleCheckChange
