import React from 'react'
import { MenuIcon } from '@styles/Icons'
import { IconButton } from '@components'
import { MobileToolbarProps } from '../../../typings'
import ToolbarActionItems from './ToolbarActionItems'

const MobileToolbar: React.FC<MobileToolbarProps> = ({ handleOpen }) => {
  return (
    <>
      <IconButton
        icon={<MenuIcon />}
        description={'Open menu'}
        onClick={handleOpen}
      />
      <ToolbarActionItems />
    </>
  )
}

export default MobileToolbar
