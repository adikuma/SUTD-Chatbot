const useHandleNumericChange = (
  setAttribute: React.Dispatch<React.SetStateAction<any>>
) => {
  const handleNumericChange = (_event: any, newValue: any): void => {
    setAttribute(newValue)
  }

  return handleNumericChange
}

export default useHandleNumericChange
