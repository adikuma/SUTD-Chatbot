import React from 'react'
import { Link } from '@components/navigation/Link'
import { FooterLinksItemProps } from '../typings'

const CustomFooterLinksItem: React.FC<{ item: FooterLinksItemProps }> = ({
  item
}) => {
  return <Link href={item.href}>{item.icon}</Link>
}

export default CustomFooterLinksItem
