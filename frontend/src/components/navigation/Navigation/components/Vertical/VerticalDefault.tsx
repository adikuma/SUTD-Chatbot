import React, { useEffect, useMemo } from 'react'
import { Toolbar } from '@mui/material'
import { MenuIcon } from '@styles/Icons'
import { IconButton, ListProps } from '@components'
import { useGlobalState } from '@hooks'
import { useHandleRouteChange, useIsMobile } from '@hooks/ui'
import { generateListWithRoutings } from '@utils/handleGeneration'
import { MobileDrawer } from '../Horizontal/common'

const VerticalDefault: React.FC<ListProps> = ({ items }) => {
  const handleRouteChange = useHandleRouteChange()
  const isMobile = useIsMobile()
  const { open, handleOpen, handleClose } = useGlobalState()

  useEffect(() => {
    if (!isMobile) {
      handleOpen()
    } else {
      handleClose()
    }
  }, [isMobile])

  const itemsWithRouting = useMemo<any>(
    () => generateListWithRoutings(items, handleRouteChange),
    [items]
  )

  return (
    <>
      {isMobile && (
        <Toolbar>
          <IconButton
            icon={<MenuIcon />}
            description={'Open menu'}
            onClick={handleOpen}
          />
        </Toolbar>
      )}

      <MobileDrawer
        items={itemsWithRouting}
        isMobile={isMobile}
        open={open}
        handleClose={handleClose}
        subItemsIndicator
      />
    </>
  )
}

export default VerticalDefault
