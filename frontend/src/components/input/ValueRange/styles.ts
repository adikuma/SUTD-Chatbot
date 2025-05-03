export const value_range_title = {
  mt: '1.4rem',
  mb: '1rem'
}

export const value_range = (spaceBetween: boolean) => ({
  display: 'grid',
  gridTemplateColumns: spaceBetween ? '1fr' : { xs: '1fr', sm: '1fr 1fr' },
  gap: '1rem',
  alignItems: 'center'
})

export const value_range_operation = (spaceBetween: boolean) => ({
  mb: spaceBetween ? '-1rem' : 0
})

export const value_range_input_container = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1rem'
}

export const value_range_input = (isVisible: boolean) => ({
  visibility: isVisible ? 'visible' : 'hidden'
})
