import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import { Size } from '@enums/ui'
import { DialogProps } from '../typings'

const CustomDialog: React.FC<DialogProps> = ({
  title,
  content,
  actions,
  open,
  onClose,
  fullWidth = true,
  maxWidth = Size.ShortSize.MD,
  sx = {}
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      sx={sx}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  )
}

export default CustomDialog
