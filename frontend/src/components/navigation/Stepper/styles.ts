import { Orientation } from '@enums/ui'

export const stepper_content = (orientation: string) => ({
  display: 'flex',
  flexDirection: orientation === Orientation.HORIZONTAL ? 'column' : 'row'
})

export const stepper_content_box = {
  flex: 1,
  mt: 10,
  mb: 10
}

export const stepper_content_buttons = {
  display: 'flex',
  justifyContent: 'space-between'
}
