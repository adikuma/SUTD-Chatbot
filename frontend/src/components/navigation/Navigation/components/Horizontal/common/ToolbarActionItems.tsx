import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountCircleIcon } from '@styles/Icons'
import { Box, IconButton } from '@components'
import * as styles from '../styles'

const ToolbarActionItems: React.FC = () => {
  const navigate = useNavigate()

  const handleGoToAccount = (): void => {
    navigate('/account')
  }

  return (
    <Box sx={styles.nav_toolbar_action_items}>
      <IconButton
        icon={<AccountCircleIcon />}
        description={'Account'}
        onClick={handleGoToAccount}
      />
    </Box>
  )
}

export default ToolbarActionItems
