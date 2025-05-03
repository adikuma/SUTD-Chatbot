import { isNumber } from '../handleValidation'

const formatTwoDecimal = (num: number): string => {
  if (!isNumber(num)) {
    num = 0
  }

  return num.toFixed(2)
}

export default formatTwoDecimal
