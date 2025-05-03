import { Variant } from '@enums/ui'
import {
  CategoricalAnalyticsData,
  TimeSeriesAnalyticsData
} from '@typings/common'
import palette from '@styles/Palette'
import typography from '@styles/Typography'

type ChartOptionArgs = {
  type: Variant.Chart
  data: CategoricalAnalyticsData[] | TimeSeriesAnalyticsData[]
  xAxisDataKey?: string
  foreColor?: string
  plotOptions?: any
  stroke?: any
  colors?: string[]
}

const generateChartOptions = ({
  type,
  data,
  xAxisDataKey,
  foreColor = palette.blue.muted,
  plotOptions = {},
  stroke = { width: 3, curve: 'smooth' },
  colors = [palette.blue.main, palette.blue.light]
}: ChartOptionArgs): any => {
  if (type === Variant.Chart.PIE || type === Variant.Chart.DONUT) {
    return {
      chart: {
        id: `${type}-chart`,
        fontFamily: typography.fontFamily,
        foreColor,
        toolbar: { show: false },
        type
      },
      colors,
      labels: data.map((e: any) => e.category),
      legend: { show: true, position: 'bottom', width: '50px' },
      dataLabels: { enabled: true },
      tooltip: { theme: 'light' },
      plotOptions: {}
    }
  }

  return {
    chart: {
      id: `${type}-chart`,
      fontFamily: typography.fontFamily,
      foreColor,
      zoom: { enabled: true },
      toolbar: { show: false },
      type
    },
    plotOptions,
    dataLabels: { enabled: false },
    stroke,
    colors,
    xaxis: { categories: data.map((e: any) => e[xAxisDataKey]) },
    yaxis: { opposite: false, labels: { show: true } },
    legend: { show: true, position: 'bottom', width: '50px' },
    grid: { show: false },
    tooltip: { theme: 'light', illSeriesColor: false }
  }
}

export default generateChartOptions
