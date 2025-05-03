import React from 'react'
import { Avatar } from '@mui/material'
import { AvatarProps } from '../typings'

const CustomAvatar: React.FC<AvatarProps> = ({ src, alt, icon, sx = {} }) => {
  return (
    <Avatar src={src} alt={alt} sx={sx}>
      {icon}
    </Avatar>
  )
}

export default CustomAvatar
