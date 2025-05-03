const isNumber = (input: string | number): boolean => {
  if (typeof input === 'number') {
    return !isNaN(input)
  }

  if (typeof input === 'string') {
    const numberPattern = /^[0-9]+(\.[0-9]+)?$/
    return numberPattern.test(input)
  }

  return false
}

export default isNumber
