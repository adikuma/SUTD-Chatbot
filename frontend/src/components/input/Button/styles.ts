import { Variant } from '@enums/ui'

export const button = (variant: Variant.Button) => ({
  ...(variant === Variant.Button.TEXT && {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  })
})
