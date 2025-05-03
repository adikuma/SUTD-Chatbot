export const table = {
  width: '100%',
  height: '100%'
}

export const table_filter_modal_divider = {
  mb: 2
}

export const table_toolbar = (isVisible: boolean) => ({
  display: isVisible ? 'flex' : 'none',
  alignItems: 'center',
  justifyContent: 'space-between',
  mb: 2,
  flexGrow: 1,
  p: '0 1rem'
})

export const table_search = {
  flexGrow: 1,
  mr: 2,
  mt: '1rem'
}

export const table_filter_button = (isVisible: boolean) => ({
  visibility: isVisible ? 'visible' : 'hidden',
  mr: '1rem'
})

export const bulk_actions = (isVisible: boolean) => ({
  display: isVisible ? 'flex' : 'none',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
  p: '1rem'
})

export const table_row = {
  display: 'flex',
  alignItems: 'center'
}

export const table_row_content = {
  flexGrow: 1
}

// COMMON USAGE IN FEATURES
export const table_checkbox = {
  display: 'flex',
  alignItems: 'center',
  height: '100%'
}

export const table_select = {
  mt: '0.3rem'
}

export const table_bulk_actions = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%'
}

export const table_bulk_actions_left = {
  display: 'flex',
  gap: 2,
  flexShrink: 0
}

export const table_bulk_actions_right = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  flexShrink: 0,
  justifyContent: 'flex-end',
  '& > *': {
    flexShrink: 0,
    gap: 1
  }
}

export const table_bulk_actions_checkbox = {
  p: 0,
  pr: '0.2rem'
}

export const table_bulk_actions_input = {
  mb: 0
}

export const table_bulk_actions_select = {
  mb: '-1rem'
}
