const formatSentenceCase = (str: string): string => {
  if (typeof str !== 'string') return ''

  const firstCharUppercase: string = str.charAt(0).toUpperCase()
  const remainingChars: string = str.slice(1)

  return firstCharUppercase + remainingChars
}

export default formatSentenceCase
