import React, { useMemo } from 'react'
import { Orientation } from '@enums/ui'
import { Box, List, ListProps } from '@components'
import { useHandleRouteChange, useIsMobile, useOpenCloseState } from '@hooks/ui'
import { generateListWithRoutings } from '@utils/handleGeneration'
import * as styles from './styles'
import {
  MobileDrawer,
  MobileToolbar,
  Toolbar,
  ToolbarActionItems
} from './common'

const HorizontalVariation1: React.FC<ListProps> = ({ items }) => {
  const handleRouteChange = useHandleRouteChange()
  const isMobile = useIsMobile()
  const { open, handleOpen, handleClose } = useOpenCloseState(false)

  const itemsWithRouting = useMemo<any>(
    () => generateListWithRoutings(items, handleRouteChange),
    [items]
  )

  return (
    <>
      <Toolbar>
        {isMobile && <MobileToolbar handleOpen={handleOpen} />}

        {!isMobile && (
          <>
            <Box sx={styles.nav_middle_box}>
              <Box sx={styles.nav_inner_box}>
                <List
                  items={itemsWithRouting}
                  orientation={Orientation.HORIZONTAL}
                />
              </Box>
            </Box>

            <ToolbarActionItems />
          </>
        )}
      </Toolbar>

      <MobileDrawer
        items={itemsWithRouting}
        isMobile={isMobile}
        open={open}
        handleClose={handleClose}
      />
    </>
  )
}

export default HorizontalVariation1
