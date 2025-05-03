import { useState } from 'react'

const useHandleExpandChange = (): [
  any[],
  (
    item: any
  ) => (event: React.SyntheticEvent | null, isExpanded: boolean) => void
] => {
  const [expandedItems, setExpandedItems] = useState<any[]>([])

  const handleExpandChange =
    (item: any) =>
    (_event: React.SyntheticEvent | null, isExpanded: boolean): void => {
      if (isExpanded) {
        setExpandedItems((prev: any) => [...prev, item])
      } else {
        setExpandedItems((prev: any) => prev.filter((i: any) => i !== item))
      }
    }

  return [expandedItems, handleExpandChange]
}

export default useHandleExpandChange
