import React from 'react'
import { Box } from '@mui/material'
import { BoxProps } from '../typings'

const CustomBox: React.FC<BoxProps> = ({ children, onClick, sx = {} }) => {
  return (
    <Box onClick={onClick} sx={sx}>
      {children}
    </Box>
  )
}

export default CustomBox
