import React, { useMemo } from 'react'
import { Variant } from '@enums/ui'
import { generateChartOptions } from '@utils/handleGeneration'
import { CategoricalChartProps } from '../typings'
import Chart from './Chart'

const CustomDonutChart: React.FC<CategoricalChartProps> = ({
  title,
  data,
  filters
}) => {
  const options = useMemo<any>(
    () =>
      generateChartOptions({
        type: Variant.Chart.DONUT,
        data,
        plotOptions: { pie: { donut: { size: '70%' } } }
      }),
    [data]
  )

  const series = useMemo<any>(
    () => data.map((e: any): number => e.count),
    [data]
  )

  return (
    <Chart
      type={Variant.Chart.DONUT}
      title={title}
      options={options}
      series={series}
      filters={filters}
    />
  )
}

export default CustomDonutChart
