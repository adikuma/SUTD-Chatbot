import React from 'react'
import { Box } from '@components/layout'
import { ImageProps } from '../typings'

const CustomImage: React.FC<ImageProps> = ({
  src,
  srcSet,
  alt,
  onClick,
  sx = {}
}) => {
  return (
    <Box sx={sx}>
      <img
        src={src}
        srcSet={srcSet}
        alt={alt}
        onClick={onClick}
        loading={'lazy'}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Box>
  )
}

export default CustomImage
