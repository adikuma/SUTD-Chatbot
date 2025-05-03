import { SxProps, Theme } from '@mui/material'

export interface UploaderProps {
  initialFiles?: File[]
  onUpload: (files: File[]) => void
  multiple?: boolean
  required?: boolean
  disabled?: boolean
  error?: boolean
  helperText?: string
  sx?: SxProps<Theme>
}
