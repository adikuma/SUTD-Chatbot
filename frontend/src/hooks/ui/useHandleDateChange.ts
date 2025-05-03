const useHandleDateChange = (
  setAttribute: React.Dispatch<React.SetStateAction<any>>,
  targetKey?: string
) => {
  const handleDateChange = (date: any): void => {
    const formattedDate: string | null = date ? date.toISOString() : null

    if (targetKey) {
      setAttribute((prev: any) => ({ ...prev, [targetKey]: formattedDate }))
    } else {
      setAttribute(formattedDate)
    }
  }

  return handleDateChange
}

export default useHandleDateChange
