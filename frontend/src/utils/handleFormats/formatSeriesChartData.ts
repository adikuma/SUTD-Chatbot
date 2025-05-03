import { formatCamelCaseToTitleCase } from '../handleFormats'

type SeriesChartData = { name: string; data: any[] }

const formatSeriesChartData = (
  data: any[],
  yAxisDataKey?: string,
  yAxisDataKeys?: string[]
): SeriesChartData[] => {
  const keys: string[] = yAxisDataKeys?.length
    ? yAxisDataKeys
    : [yAxisDataKey].filter(Boolean)

  return keys.map((key: string): { name: string; data: any } => ({
    name: formatCamelCaseToTitleCase(key),
    data: data.map((e) => e[key])
  }))
}

export default formatSeriesChartData
