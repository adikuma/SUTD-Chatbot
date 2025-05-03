import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode
} from 'react'
import { StepperContextProps } from '../typings'

const StepperContext = createContext<StepperContextProps | undefined>(undefined)

export const StepperProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [activeStep, setActiveStep] = useState<number>(0)

  const handleNext = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const contextValue = useMemo<StepperContextProps>(
    () => ({
      activeStep,
      handleNext,
      handleBack
    }),
    [activeStep]
  )

  return (
    <StepperContext.Provider value={contextValue}>
      {children}
    </StepperContext.Provider>
  )
}

export const useStepper = (): StepperContextProps => {
  return useContext(StepperContext)
}
