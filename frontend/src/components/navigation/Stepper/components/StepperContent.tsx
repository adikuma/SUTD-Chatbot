import React from 'react'
import { Variant } from '@enums/ui'
import { Box } from '@components/layout'
import { Button } from '@components/input'
import { StepperItemProps, StepperContentProps } from '../typings'
import * as styles from '../styles'
import { useStepper } from '../hooks'

const CustomStepperContent: React.FC<StepperContentProps> = ({
  items,
  onFinish,
  onFinishDisabled,
  orientation
}) => {
  const { activeStep, handleNext, handleBack } = useStepper()

  const currentStep: StepperItemProps = items[activeStep]
  const finalStep: number = items.length - 1
  const isNextDisabled: boolean = currentStep.onNextDisabled ?? false

  const handleNextStep = (): void => {
    Promise.resolve(currentStep?.onNext?.()).then(() => {
      handleNext()
    })
  }

  return (
    <Box sx={styles.stepper_content(orientation)}>
      <Box sx={styles.stepper_content_box}>{currentStep.content}</Box>

      <Box sx={styles.stepper_content_buttons}>
        <Button
          label={'Back'}
          onClick={handleBack}
          disabled={activeStep === 0}
          variant={Variant.Button.OUTLINED}
        />
        <Button
          label={activeStep === finalStep ? 'Finish' : 'Next'}
          onClick={activeStep === finalStep ? onFinish : handleNextStep}
          disabled={
            activeStep === finalStep ? onFinishDisabled : isNextDisabled
          }
          variant={Variant.Button.CONTAINED}
        />
      </Box>
    </Box>
  )
}

export default CustomStepperContent
