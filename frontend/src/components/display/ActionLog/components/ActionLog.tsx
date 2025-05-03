import React from 'react'
import { Variant } from '@enums/ui'
import { Text } from '@components/display/Text'
import { ActionLogProps } from '../typings'
import * as styles from '../styles'

const CustomActionLog: React.FC<ActionLogProps> = ({
  createdAt,
  updatedAt,
  deletedAt
}) => {
  return (
    <>
      <Text content={`Created at ${createdAt}`} variant={Variant.Text.BODY2} />
      <Text
        content={`Last updated at ${updatedAt}`}
        variant={Variant.Text.BODY2}
        sx={styles.action_log_label(!!updatedAt)}
      />
      <Text
        content={`Deleted at ${deletedAt}`}
        variant={Variant.Text.BODY2}
        sx={styles.action_log_label(!!deletedAt)}
      />
    </>
  )
}

export default CustomActionLog
