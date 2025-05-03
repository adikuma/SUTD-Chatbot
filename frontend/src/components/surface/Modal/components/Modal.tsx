import React from 'react'
import { Modal } from '@mui/material'
import { Variant } from '@enums/ui'
import { Box } from '@components/layout'
import { Text } from '@components/display'
import { ModalProps } from '../typings'
import * as styles from '../styles'

const CustomModal: React.FC<ModalProps> = ({
  title,
  content,
  leftActions,
  rightActions,
  open,
  onClose,
  sx = {}
}) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby='modal'>
      <Box sx={{ ...styles.modal, ...sx }}>
        <Text
          content={title}
          variant={Variant.Text.H2}
          sx={styles.modal_title(!!title)}
        />

        {content}

        <Box sx={styles.modal_actions}>
          <Box sx={styles.modal_left_actions}>{leftActions}</Box>
          <Box sx={styles.modal_right_actions}>{rightActions}</Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default CustomModal
