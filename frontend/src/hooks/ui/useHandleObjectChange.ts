const useHandleObjectChange = (
  setAttribute: React.Dispatch<React.SetStateAction<any>>,
  targetKey: string,
  isResource: boolean
) => {
  const handleObjectChange = (_event: any, newValue: any): void => {
    setAttribute((prevValue: any) => ({ ...prevValue, [targetKey]: newValue }))
  }

  const handleResourceObjectChange = (_event: any, newValue: any): void => {
    setAttribute(newValue)
  }

  return isResource ? handleResourceObjectChange : handleObjectChange
}

export default useHandleObjectChange
