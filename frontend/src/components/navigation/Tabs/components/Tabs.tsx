import React from 'react'
import { Tabs, Tab, TabScrollButton } from '@mui/material'
import { Color, Orientation, Variant } from '@enums/ui'
import { ArrowBackIcon, ArrowForwardIcon } from '@styles/Icons'
import { Box } from '@components/layout'
import { TabsProps } from '../typings'
import * as styles from '../styles'
import { useTabs } from '../hooks'

const CustomTabs: React.FC<TabsProps> = ({
  items,
  variant = Variant.Tabs.STANDARD,
  orientation = Orientation.HORIZONTAL,
  showScrollButtons = false,
  allowScrollButtonsMobile = false,
  sx = {}
}) => {
  const { selectedTab, handleSelectChange } = useTabs()

  return (
    <Box sx={sx}>
      <Tabs
        value={selectedTab}
        onChange={handleSelectChange}
        variant={variant}
        orientation={orientation}
        scrollButtons={showScrollButtons}
        allowScrollButtonsMobile={allowScrollButtonsMobile}
        ScrollButtonComponent={(props) => (
          <TabScrollButton {...props}>
            {props.direction === 'left' ? (
              <ArrowBackIcon />
            ) : (
              <ArrowForwardIcon />
            )}
          </TabScrollButton>
        )}
        textColor={Color.Default.PRIMARY}
        indicatorColor={Color.Default.PRIMARY}
        aria-label={'tabs'}
      >
        {items.map((item) => (
          <Tab key={item.label} label={item.label} disabled={item?.disabled} />
        ))}
      </Tabs>

      <Box sx={styles.tabs_content}>{items[selectedTab].content}</Box>
    </Box>
  )
}

export default CustomTabs
