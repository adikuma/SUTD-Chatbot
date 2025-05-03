export const formatSelectedRowsToUpdateMutation = (
  selectedRows: any[],
  updateArgs: any
): any[] => {
  return selectedRows.map((row: any): any => ({ ...row, ...updateArgs }))
}

export const formatSelectedRowsToDeleteMutation = (
  selectedRows: any[]
): any[] => {
  return selectedRows.map((row: any): any => ({ _id: row._id }))
}
