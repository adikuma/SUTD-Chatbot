import { ReactNode } from 'react'
import { SxProps, Theme } from '@mui/material'
import { Orientation } from '@enums/ui'

export interface StepperContextProps {
  activeStep: number
  handleNext: () => void
  handleBack: () => void
}

export interface StepperProps {
  items: StepperItemProps[]
  onFinish: () => void
  onFinishDisabled?: boolean
  orientation?: Orientation
  sx?: SxProps<Theme>
}

export interface StepperItemProps {
  label: string
  content: ReactNode
  disabled?: boolean
  onNext?: () => void
  onNextDisabled?: boolean
}

export interface StepperNavigationProps {
  items: StepperItemProps[]
  orientation?: Orientation
}

export interface StepperContentProps {
  items: StepperItemProps[]
  onFinish: () => void
  onFinishDisabled?: boolean
  orientation?: Orientation
}
