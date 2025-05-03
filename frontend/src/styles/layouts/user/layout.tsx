import { FunctionComponent, ReactElement } from 'react'
import { Facebook, Instagram } from '@styles/Icons'
import { Box, Footer, HorizontalVariation1 } from '@components'
import * as styles from './styles'

const withLayout = ({ Page }: { Page: FunctionComponent }): ReactElement => {
  // SAMPLE NAVIGATION ITEMS
  const navigationItems = [
    { primaryLabel: 'Home', route: '/' },
    { primaryLabel: 'Products', route: '/products' },
    { children: 'LOGO.' },
    { primaryLabel: 'Blog', route: '/blog' },
    { primaryLabel: 'Features', route: '/features' }
  ]

  const mainLabel = ''
  const footerLinks = [
    { href: '#', icon: <Facebook /> },
    { href: '#', icon: <Instagram /> }
  ]
  const email = ''

  return (
    <>
      <HorizontalVariation1 items={navigationItems} />

      <Box sx={styles.layout}>
        <Box sx={styles.content}>
          <Page />
        </Box>
        <Footer mainLabel={mainLabel} links={footerLinks} email={email} />
      </Box>
    </>
  )
}

export default withLayout
