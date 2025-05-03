const formatUnderscoreToSpace = (str: string): string => {
  if (typeof str !== 'string') return ''

  return str.replace(/_/g, ' ')
}

export default formatUnderscoreToSpace
