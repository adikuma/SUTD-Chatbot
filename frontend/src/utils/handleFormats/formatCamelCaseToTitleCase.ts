import formatSentenceCase from './formatSentenceCase'

const formatCamelCaseToTitleCase = (str: string): string => {
  if (typeof str !== 'string') return ''

  const uppercasePattern = /([A-Z])/g
  const replacement = ' $1'
  const stringWithSpaces: string = str.replace(uppercasePattern, replacement)

  return formatSentenceCase(stringWithSpaces)
}

export default formatCamelCaseToTitleCase
