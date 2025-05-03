const displayListSubItemsIndicator = (
  idx: string,
  itemsCount: number
): string => {
  const lastIndexString: string = (itemsCount - 1).toString()

  if (idx === '0') {
    return '0%'
  }

  if (idx === lastIndexString) {
    return '100%'
  }

  return '50%'
}

export default displayListSubItemsIndicator
