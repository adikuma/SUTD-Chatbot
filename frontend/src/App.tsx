import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { Chatbot } from '@features/chats'

// Create a modern, clean theme with Raleway font and orange accents
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#FF7843' },
    secondary: { main: '#FFF8F5' },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#1F2024',
      secondary: '#565A67'
    },
    divider: 'rgba(0, 0, 0, 0.12)'
  },
  typography: {
    fontFamily: [
      'Raleway',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
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
    borderRadius: 8
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
        
        body {
          background-color: #FFFFFF;
          background-image: radial-gradient(circle at 30% 20%, #FFF0EB 0%, transparent 35%);
          min-height: 100vh;
          overflow-x: hidden;
        }
        
        ::-webkit-scrollbar {
          width: 6px;
          background-color: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background-color: rgba(255, 120, 67, 0.2);
          border-radius: 4px;
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
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.06)'
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