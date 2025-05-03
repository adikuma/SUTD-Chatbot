import React from 'react'
import { Orientation } from '@enums/ui'
import { Box } from '@components/layout'
import { StepperProps } from '../typings'
import { StepperProvider } from '../hooks'
import StepperNavigation from './StepperNavigation'
import StepperContent from './StepperContent'

const CustomStepper: React.FC<StepperProps> = ({
  items,
  onFinish,
  onFinishDisabled = false,
  orientation = Orientation.HORIZONTAL,
  sx = {}
}) => {
  return (
    <StepperProvider>
      <Box sx={sx}>
        <StepperNavigation items={items} orientation={orientation} />

        <StepperContent
          items={items}
          onFinish={onFinish}
          onFinishDisabled={onFinishDisabled}
          orientation={orientation}
        />
      </Box>
    </StepperProvider>
  )
}

export default CustomStepper
