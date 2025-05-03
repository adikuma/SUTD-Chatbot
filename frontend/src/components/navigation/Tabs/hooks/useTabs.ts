import { useState } from 'react'
import { useHandleNumericChange } from '@hooks/ui'

const useTabs = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0)

  const handleSelectChange = useHandleNumericChange(setSelectedTab)

  return { selectedTab, handleSelectChange }
}

export default useTabs
