import React from 'react'
import { Box } from '@components/layout'
import { FooterLinksProps } from '../typings'
import * as styles from '../styles'
import FooterLinksItem from './FooterLinksItem'

const CustomFooterLinks: React.FC<FooterLinksProps> = ({ items }) => {
  return (
    <Box sx={styles.footer_links}>
      {items.map((item) => (
        <FooterLinksItem key={item.href} item={item} />
      ))}
    </Box>
  )
}

export default CustomFooterLinks
