import React from 'react'
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/lab'
import { Color, Variant } from '@enums/ui'
import { TimelineItemProps } from '../typings'

const CustomTimelineItem: React.FC<TimelineItemProps> = ({
  item,
  lastItem,
  variant = Variant.TimelineDot.FILLED,
  color = Color.Inherit.PRIMARY
}) => {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot variant={variant} color={color} />
        {!lastItem && <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>{item}</TimelineContent>
    </TimelineItem>
  )
}

export default CustomTimelineItem
