import { useState } from 'react'

const useFilters = (
  initialFiltersArr: any[],
  setParentFiltersArr: Array<React.Dispatch<React.SetStateAction<any>>>
) => {
  const localStates = initialFiltersArr.map((initialFilter) =>
    useState(initialFilter)
  )

  const localFilters = localStates.map(([filter]) => filter)
  const setLocalFilters = localStates.map(([, setFilter]) => setFilter)

  const applyFilters = (): void => {
    localFilters.forEach((filter, index) => {
      setParentFiltersArr[index](filter)
    })
  }

  return { localFilters, setLocalFilters, applyFilters }
}

export default useFilters
