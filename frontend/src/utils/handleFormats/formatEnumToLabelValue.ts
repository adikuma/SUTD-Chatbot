import { LabelValue } from '@typings/common'
import formatUnderscoreToSpace from './formatUnderscoreToSpace'
import formatUppercaseToTitleCase from './formatUppercaseToTitleCase'

const formatEnumToLabelValue = (enumObj: object): LabelValue[] => {
  return Object.entries(enumObj).map(([key, value]) => ({
    label: formatUppercaseToTitleCase(formatUnderscoreToSpace(key)),
    value
  }))
}

export default formatEnumToLabelValue
