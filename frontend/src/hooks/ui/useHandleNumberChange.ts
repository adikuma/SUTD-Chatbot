import { ChangeEvent } from 'react'
import { isNumber } from '@utils/handleValidation'

const useHandleNumberChange = (
  setAttribute: React.Dispatch<React.SetStateAction<number>>,
  min: number,
  max: number
) => {
  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValueString = event.target.value
    const newValueNumber = parseInt(newValueString, 10)

    const newValueIsNumber = isNumber(newValueString)
    const newValueWithinRange = newValueNumber >= min && newValueNumber <= max

    if (newValueIsNumber && newValueWithinRange) {
      setAttribute(newValueNumber)
    }
  }

  return handleNumberChange
}

export default useHandleNumberChange
