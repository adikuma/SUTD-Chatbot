import { FunctionComponent, ReactElement } from 'react'
import { Box, VerticalDefault } from '@components'
import * as styles from './styles'

// SAMPLE ICONS
import { Home, Store } from '@mui/icons-material'

const withLayout = (Page: FunctionComponent, title?: string) => {
  const LayoutComponent: FunctionComponent<{
    title: string
  }> = (): ReactElement => {
    // SAMPLE NAVIGATION ITEMS
    const items = [
      { primaryLabel: 'header', secondaryLabel: 'Dashboard' },
      { primaryLabel: 'Overview', primaryIcon: <Home />, route: '/' },
      {
        primaryLabel: 'Projects',
        primaryIcon: <Store />,
        subItems: [
          { primaryLabel: 'Project 1', route: '/projects/project1' },
          { primaryLabel: 'Project 2', route: '/projects/project2' },
          { primaryLabel: 'Project 3' },
          { primaryLabel: 'Project 4' }
        ]
      }
    ]

    return (
      <>
        <VerticalDefault items={items} />

        <Box sx={styles.layout_content}>
          {title && <h1>{title}</h1>}
          <Page />
        </Box>
      </>
    )
  }

  return LayoutComponent
}

export default withLayout
