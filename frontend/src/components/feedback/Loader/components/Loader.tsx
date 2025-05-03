import React, { ReactElement } from 'react'
import { CircularProgress, LinearProgress } from '@mui/material'
import { Color, Variant } from '@enums/ui'
import { Box } from '@components/layout'
import { Text } from '@components/display'
import { LoaderProps } from '../typings'
import * as styles from '../styles'

const CustomLoader: React.FC<LoaderProps> = ({
  type = Variant.Loader.CIRCULAR,
  label,
  sx = {}
}) => {
  const Loader = (): ReactElement => {
    switch (type) {
      case Variant.Loader.CIRCULAR:
        return (
          <CircularProgress
            size={40}
            thickness={3.5}
            color={Color.Inherit.PRIMARY}
          />
        )
      case Variant.Loader.LINEAR:
        return <LinearProgress color={Color.Inherit.PRIMARY} />
    }
  }

  return (
    <Box sx={{ ...styles.loader, ...sx }}>
      <Loader />
      <Text
        content={label}
        variant={Variant.Text.BODY2}
        sx={styles.loader_label(!!label)}
      />
    </Box>
  )
}

export default CustomLoader
