export const modal: any = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 780,
  maxHeight: '80vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  p: '2rem',
  borderRadius: '1rem'
}

export const modal_title = (isVisible: boolean) => ({
  mb: '2rem',
  display: isVisible ? 'block' : 'none'
})

export const modal_actions = {
  display: 'flex',
  justifyContent: 'space-between',
  mt: '2rem'
}

export const modal_left_actions = {
  display: 'flex',
  gap: '0.5rem'
}

export const modal_right_actions = {
  display: 'flex',
  gap: '0.5rem'
}

// COMMON USAGE IN FEATURES
export const modal_create_row = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  mb: '1rem'
}

export const modal_create_checkbox = {
  mb: '0.8rem'
}

export const modal_create_textfield = {
  flex: 1,
  mb: '-0.2rem'
}

export const modal_create_remove_button = {
  ml: 'auto'
}

export const modal_create_add_button = {
  mt: '1rem'
}

export const modal_upload_description = {
  mb: '1rem'
}
