export interface CategoricalAnalyticsData {
  category: string
  count: number
}

export interface TimeSeriesAnalyticsData {
  date?: string
  dateTime?: string
  month?: string
  year?: string
  [key: string]: number
}
