import React, { ReactNode } from 'react'
import { AppBar, Toolbar } from '@mui/material'
import * as styles from '../styles'

const CustomToolbar: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AppBar position='fixed' color='transparent' elevation={0}>
      <Toolbar sx={styles.nav_toolbar}>{children}</Toolbar>
    </AppBar>
  )
}

export default CustomToolbar
