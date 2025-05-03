import { DateRangeMode } from '../../enums'

export interface DateRange {
  startDate: Date
  endDate: Date
  filterBy: DateRangeMode
}
