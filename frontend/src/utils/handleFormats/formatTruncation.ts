const formatTruncation = (str: string, len: number): string => {
  if (typeof str !== 'string') return ''
  if (str.length <= len) return str

  const truncatedStr: string = str.substring(0, len)
  const ellipsis = '...'

  return `${truncatedStr}${ellipsis}`
}

export default formatTruncation
