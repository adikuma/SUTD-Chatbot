import React from 'react'
import { Breadcrumbs } from '@mui/material'
import { BreadcrumbsProps } from '../typings'
import BreadcrumbsItem from './BreadcrumbsItem'

const CustomBreadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <Breadcrumbs separator={'/'} aria-label={'breadcrumbs'}>
      {items.map((item) => (
        <BreadcrumbsItem key={item.label} item={item} />
      ))}
    </Breadcrumbs>
  )
}

export default CustomBreadcrumbs
