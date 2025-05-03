import React from 'react'
import { Variant } from '@enums/ui'
import { Box } from '@components/layout'
import { Text } from '@components/display'
import { FooterProps } from '../typings'
import * as styles from '../styles'
import FooterLinks from './FooterLinks'

const CustomFooter: React.FC<FooterProps> = ({ mainLabel, links, email }) => {
  return (
    <Box sx={styles.footer}>
      <Text
        content={mainLabel}
        variant={Variant.Text.H3}
        sx={styles.footer_item}
      />
      <Text
        content={`©2024 ${mainLabel}. All rights reserved.`}
        sx={styles.footer_item}
      />
      <FooterLinks items={links} />
      <Text content={`Support: ${email}`} sx={styles.footer_item} />
    </Box>
  )
}

export default CustomFooter
