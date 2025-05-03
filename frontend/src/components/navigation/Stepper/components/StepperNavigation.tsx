import React from 'react'
import { Stepper, Step, StepLabel } from '@mui/material'
import { StepperNavigationProps } from '../typings'
import { useStepper } from '../hooks'

const CustomStepperNavigation: React.FC<StepperNavigationProps> = ({
  items,
  orientation
}) => {
  const { activeStep } = useStepper()

  return (
    <Stepper
      activeStep={activeStep}
      orientation={orientation}
      aria-label={'stepper'}
    >
      {items.map((item) => (
        <Step key={item.label} disabled={item?.disabled}>
          <StepLabel>{item.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export default CustomStepperNavigation
