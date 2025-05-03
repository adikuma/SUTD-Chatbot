import { SyntheticEvent } from 'react'
import { SxProps, Theme } from '@mui/material'
import { LabelValue } from '@typings/common'

export interface SelectProps {
  label?: string
  attribute: any
  setAttribute?: React.Dispatch<React.SetStateAction<any>>
  targetKey: string
  onChange?: (
    event: SyntheticEvent<Element, Event>,
    value: LabelValue | LabelValue[] | null
  ) => void
  options: any[]
  isResource?: boolean
  multiple?: boolean
  required?: boolean
  disabled?: boolean
  error?: boolean
  helperText?: string
  fullWidth?: boolean
  sx?: SxProps<Theme>
}
