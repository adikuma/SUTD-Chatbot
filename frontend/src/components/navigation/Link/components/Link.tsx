import React from 'react'
import { Link } from '@mui/material'
import { Color, Target, Underline, Variant } from '@enums/ui'
import { LinkProps } from '../typings'

const CustomLink: React.FC<LinkProps> = ({
  children,
  href,
  target = Target.SELF,
  variant = Variant.Text.BODY1,
  color = Color.Link.INHERIT,
  underline = Underline.HOVER,
  sx = {}
}) => {
  return (
    <Link
      href={href}
      target={target}
      variant={variant}
      color={color}
      underline={underline}
      sx={sx}
    >
      {children}
    </Link>
  )
}

export default CustomLink
