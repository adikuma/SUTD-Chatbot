import React, { useMemo } from 'react'
import { Variant } from '@enums/ui'
import { generateChartOptions } from '@utils/handleGeneration'
import { formatSeriesChartData } from '@utils/handleFormats'
import { TimeSeriesChartProps } from '../typings'
import Chart from './Chart'

const CustomBarChart: React.FC<TimeSeriesChartProps> = ({
  title,
  data,
  xAxisDataKey,
  yAxisDataKey,
  yAxisDataKeys,
  filters
}) => {
  const options = useMemo<any>(
    () =>
      generateChartOptions({
        type: Variant.Chart.BAR,
        data,
        xAxisDataKey,
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        },
        stroke: { width: 2, colors: ['transparent'] }
      }),
    [data, xAxisDataKey]
  )

  const series = useMemo<any>(
    () => formatSeriesChartData(data, yAxisDataKey, yAxisDataKeys),
    [data, yAxisDataKey, yAxisDataKeys]
  )

  return (
    <Chart
      type={Variant.Chart.BAR}
      title={title}
      options={options}
      series={series}
      filters={filters}
    />
  )
}

export default CustomBarChart
