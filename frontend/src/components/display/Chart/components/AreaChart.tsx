import React, { useMemo } from 'react'
import { Variant } from '@enums/ui'
import { generateChartOptions } from '@utils/handleGeneration'
import { formatSeriesChartData } from '@utils/handleFormats'
import { TimeSeriesChartProps } from '../typings'
import Chart from './Chart'

const CustomAreaChart: React.FC<TimeSeriesChartProps> = ({
  title,
  data,
  xAxisDataKey,
  yAxisDataKey,
  yAxisDataKeys,
  filters
}) => {
  const options = useMemo<any>(
    () =>
      generateChartOptions({ type: Variant.Chart.AREA, data, xAxisDataKey }),
    [data, xAxisDataKey]
  )

  const series = useMemo<any>(
    () => formatSeriesChartData(data, yAxisDataKey, yAxisDataKeys),
    [data, yAxisDataKey, yAxisDataKeys]
  )

  return (
    <Chart
      type={Variant.Chart.AREA}
      title={title}
      options={options}
      series={series}
      filters={filters}
    />
  )
}

export default CustomAreaChart
