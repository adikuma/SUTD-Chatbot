import { ReactNode } from 'react'
import { Variant } from '@enums/ui'
import {
  CategoricalAnalyticsData,
  TimeSeriesAnalyticsData
} from '@typings/common'

export interface ChartProps {
  type: Variant.Chart
  title: string
  options: any
  series: any
  filters?: ReactNode
}

export interface CategoricalChartProps {
  title: string
  data: CategoricalAnalyticsData[]
  filters?: ReactNode
}

export interface TimeSeriesChartProps {
  title: string
  data: TimeSeriesAnalyticsData[]
  xAxisDataKey: string
  yAxisDataKey?: string
  yAxisDataKeys?: string[]
  filters?: ReactNode
}
