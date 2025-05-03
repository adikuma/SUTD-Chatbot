import { useState } from 'react'
import { RangeOperation } from '@enums'
import { ValueRange } from '@typings/common'

const useRangeValue = ({
  value1 = 0,
  value2 = 20,
  rangeOperation = RangeOperation.BETWEEN
}: ValueRange) => {
  const [range, setRange] = useState<ValueRange>({
    value1,
    value2,
    rangeOperation
  })

  return { range, setRange }
}

export default useRangeValue
