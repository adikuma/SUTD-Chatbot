const generateItemsPerPageOptions = (count: number): number[] => {
  if (count <= 10) {
    return [10]
  }

  if (count > 10 && count <= 20) {
    return [10, 15, 20]
  }

  if (count > 20 && count <= 50) {
    return [10, 15, 20, 25, 50]
  }

  if (count > 50 && count <= 75) {
    return [10, 15, 20, 25, 50, 75]
  }

  return [10, 15, 20, 25, 50, 75, 100]
}

export default generateItemsPerPageOptions
