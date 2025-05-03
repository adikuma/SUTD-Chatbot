import React, { Suspense, lazy } from 'react'
import { Variant } from '@enums/ui'
import { Box } from '@components/layout'
import { Text } from '@components/display/Text'
import { ChartProps } from '../typings'
import * as styles from '../styles'

const Chart = lazy(() => import('react-apexcharts'))

const CustomChart: React.FC<ChartProps> = ({
  type,
  title,
  options,
  series,
  filters
}) => {
  return (
    <>
      <Box sx={styles.chart}>
        <Box sx={styles.chart_header}>
          <Text content={title} variant={Variant.Text.H2} />
          {filters}
        </Box>
      </Box>

      <Suspense fallback={<>Loading chart...</>}>
        <Chart options={options} series={series} type={type} height={'300px'} />
      </Suspense>
    </>
  )
}

export default CustomChart
