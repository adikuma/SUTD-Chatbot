import formatSentenceCase from './formatSentenceCase'

const formatTitleCase = (str: string): string => {
  if (typeof str !== 'string') return ''

  const words: string[] = str.split(' ')
  const titleCasedWords: string[] = words.map((word: string): string =>
    formatSentenceCase(word)
  )

  return titleCasedWords.join(' ')
}

export default formatTitleCase
