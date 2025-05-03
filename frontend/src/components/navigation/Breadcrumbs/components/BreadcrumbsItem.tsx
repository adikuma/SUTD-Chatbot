import React from 'react'
import { Link } from '@components/navigation/Link'
import { Text } from '@components/display'
import { BreadcrumbsItemProps } from '../typings'

const CustomBreadcrumbsItem: React.FC<{ item: BreadcrumbsItemProps }> = ({
  item
}) => {
  if (item?.href) {
    return <Link href={item.href}>{item.label}</Link>
  }

  return <Text content={item.label} />
}

export default CustomBreadcrumbsItem
