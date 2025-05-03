import formatSentenceCase from './formatSentenceCase'

const formatUppercaseToTitleCase = (str: string): string => {
  if (typeof str !== 'string') return ''

  const uppercasePattern = /\b([A-Z]+)\b/g
  const formattedString: string = str.replace(
    uppercasePattern,
    (match) => match.charAt(0) + match.slice(1).toLowerCase()
  )

  return formatSentenceCase(formattedString)
}

export default formatUppercaseToTitleCase
