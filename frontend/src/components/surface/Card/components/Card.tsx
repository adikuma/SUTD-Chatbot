import React from 'react'
import { Card, CardActions, CardContent, CardMedia } from '@mui/material'
import { Variant } from '@enums/ui'
import { Text } from '@components/display'
import { CardProps } from '../typings'
import * as styles from '../styles'

const CustomCard: React.FC<CardProps> = ({
  imageUrl,
  title,
  content,
  actions,
  sx = {}
}) => {
  return (
    <Card sx={sx}>
      {imageUrl && (
        <CardMedia
          component={'img'}
          image={imageUrl}
          alt={title}
          loading={'lazy'}
        />
      )}

      <CardContent>
        {title && (
          <Text
            content={title}
            variant={Variant.Text.H4}
            sx={styles.card_title}
          />
        )}
        {content}
      </CardContent>

      {actions && <CardActions sx={styles.card_actions}>{actions}</CardActions>}
    </Card>
  )
}

export default CustomCard
