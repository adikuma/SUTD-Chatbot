import { LabelValue } from '@typings/common'

const formatArrToLabelValue = (
  arr: any[],
  labelKey: string,
  valueKey: string
): LabelValue[] => {
  return arr.map(
    (item: any): LabelValue => ({
      label: item[labelKey],
      value: item[valueKey]
    })
  )
}

export default formatArrToLabelValue
