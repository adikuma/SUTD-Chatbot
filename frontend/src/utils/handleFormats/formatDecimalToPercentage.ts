const formatDecimalToPercentage = (decimal?: number): string => {
  const value = decimal || 0
  return `${(value * 100).toFixed(0)}%`
}

export default formatDecimalToPercentage
