import React from 'react'
import { Drawer } from '@mui/material'
import { Variant } from '@enums/ui'
import { CloseIcon } from '@styles/Icons'
import { Box, IconButton, Image, List } from '@components'
import { MobileDrawerProps } from '../../../typings'
import * as styles from '../../../styles'

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  items,
  isMobile,
  open,
  handleClose,
  subItemsIndicator = false
}) => {
  return (
    <Drawer
      open={open}
      onClose={handleClose}
      variant={isMobile ? Variant.Drawer.TEMPORARY : Variant.Drawer.PERSISTENT}
      sx={styles.drawer}
    >
      {isMobile && (
        <Box sx={styles.drawer_icon}>
          <IconButton
            icon={<CloseIcon />}
            description={'Close menu'}
            onClick={handleClose}
          />
        </Box>
      )}

      <Box sx={styles.drawer_box}>
        <Image src={'/logo.jpg'} alt={'Logo'} sx={styles.drawer_box_logo} />
        <List
          items={
            subItemsIndicator ? items : items.filter((item) => !item.children)
          }
          subItemsIndicator={subItemsIndicator}
        />
      </Box>
    </Drawer>
  )
}

export default MobileDrawer
