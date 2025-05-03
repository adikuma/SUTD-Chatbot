import React from 'react'
import { Timeline } from '@mui/lab'
import { Color, Variant } from '@enums/ui'
import { TimelineProps } from '../typings'
import TimelineItem from './TimelineItem'

const CustomTimeline: React.FC<TimelineProps> = ({
  items,
  variant = Variant.TimelineDot.FILLED,
  color = Color.Inherit.PRIMARY,
  sx = {}
}) => {
  return (
    <Timeline sx={sx}>
      {items.map((event, idx) => (
        <TimelineItem
          key={`timeline-${idx}`}
          item={event}
          lastItem={idx === items.length - 1}
          variant={variant}
          color={color}
        />
      ))}
    </Timeline>
  )
}

export default CustomTimeline
