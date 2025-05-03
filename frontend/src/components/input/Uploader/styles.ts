import palette from '@styles/Palette'

export const uploader = (disabled: boolean) => ({
  backgroundColor: disabled ? palette.grey.A200 : 'inherit',
  border: '0.125rem dashed grey',
  p: 2,
  borderRadius: 2
})
