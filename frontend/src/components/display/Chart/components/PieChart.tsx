import React, { useMemo } from 'react'
import { Variant } from '@enums/ui'
import { generateChartOptions } from '@utils/handleGeneration'
import { CategoricalChartProps } from '../typings'
import Chart from './Chart'

const CustomPieChart: React.FC<CategoricalChartProps> = ({
  title,
  data,
  filters
}) => {
  const options = useMemo<any>(
    () => generateChartOptions({ type: Variant.Chart.PIE, data }),
    [data]
  )

  const series = useMemo<any>(
    () => data.map((e: any): number => e.count),
    [data]
  )

  return (
    <Chart
      type={Variant.Chart.PIE}
      title={title}
      options={options}
      series={series}
      filters={filters}
    />
  )
}

export default CustomPieChart
