import { createTheme } from '@mui/material/styles'
import components from './Components'
import palette from './Palette'
import shadows from './Shadows'
import typography from './Typography'

const SidebarWidth = 265
const HeaderHeight = 70

const baseTheme = {
  shape: {
    borderRadius: 5
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  components,
  palette,
  shadows,
  typography
}

const theme = createTheme(baseTheme)

export { HeaderHeight, SidebarWidth, theme }
