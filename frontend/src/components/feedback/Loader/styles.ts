export const loader = {
  display: 'flex',
  alignItems: 'center'
}

export const loader_label = (isVisible: boolean) => ({
  display: isVisible ? 'block' : 'none'
})
