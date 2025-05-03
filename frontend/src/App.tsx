import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { Chatbot } from '@features/chats'

// Create a theme with Poppins font, black and white colors, with glassmorphism
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#FFFFFF' },
    secondary: { main: '#333333' },
    background: {
      default: '#000000',
      paper: 'rgba(30, 30, 30, 0.7)'
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255,255,255,0.7)'
    },
    divider: 'rgba(255,255,255,0.08)'
  },
  typography: {
    fontFamily: [
      'Poppins',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500 },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 400, fontSize: '0.9rem' },
    caption: { fontWeight: 400, fontSize: '0.75rem' }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        body {
          background: radial-gradient(ellipse at top, #222, #000);
          min-height: 100vh;
          overflow-x: hidden;
        }
        
        ::-webkit-scrollbar {
          width: 6px;
          background-color: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background-color: rgba(255,255,255,0.2);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background-color: transparent;
        }
      `
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(8px)'
        }
      }
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Chatbot />
    </ThemeProvider>
  )
}

export default App