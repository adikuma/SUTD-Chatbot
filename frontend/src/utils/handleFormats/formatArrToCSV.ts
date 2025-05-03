export const formatArrToCSV = (
  arr: Record<string, any>[],
  filename: string
): File => {
  if (!arr || arr?.length === 0) return null

  const headers: string[] = Object.keys(arr[0])
  const rows: any[] = arr.map((document: any) =>
    headers.map((header: string) => `"${document[header] || ''}"`).join(',')
  )

  const csvString: string = [headers.join(','), ...rows].join('\n')
  const blob: any = new Blob([csvString], { type: 'text/csv' })

  return new File([blob], filename, { type: 'text/csv' })
}

export default formatArrToCSV
