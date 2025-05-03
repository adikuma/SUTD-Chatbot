const components = {
  MuiCssBaseline: {
    styleOverrides: {
      '*': {
        boxSizing: 'border-box'
      },
      html: {
        height: '100%',
        width: '100%'
      },
      body: {
        height: '100%',
        m: 0,
        p: 0
      },
      '#root': {
        height: '100%'
      },
      '.scrollbar-container': {
        borderRight: '0 !important'
      }
    }
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingLeft: '15px !important',
        paddingRight: '15px !important',
        maxWidth: '1600px'
      }
    }
  },
  MuiButton: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
        fontSize: '15px',
        '&:hover': {
          boxShadow: 'none'
        }
      }
    }
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: '20px',
        p: '14px',
        m: '15px',
        boxShadow: '0 0.438rem 1.875rem 0 rgba(90, 114, 123, 0.11)'
      }
    }
  },
  MuiChip: {
    styleOverrides: {
      root: {
        fontWeight: '500',
        fontSize: '0.75rem',
        height: '24px'
      }
    }
  },
  MuiGridItem: {
    styleOverrides: {
      root: {
        paddingTop: '30px',
        paddingLeft: '30px !important'
      }
    }
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        backgroundColor: '#ecf0f2',
        borderRadius: '0.4rem'
      }
    }
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        borderRadius: '0.6rem'
      }
    }
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: '40px'
      }
    }
  },
  MuiSelect: {
    styleOverrides: {
      select: {
        display: 'flex',
        flexWrap: 'wrap !important',
        maxHeight: 'auto'
      }
    }
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        justifyContent: 'flex-start'
      },
      indicator: {
        transform: 'translateY(-4px)'
      }
    }
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontSize: '16px',
        fontWeight: 500,
        minWidth: 'unset',
        padding: '8px 12px',
        paddingBottom: '2px'
      }
    }
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        marginBottom: '16px',
        '& .MuiInputBase-root': {
          height: '40px',
          padding: '0 8px !important'
        },
        '& .MuiInputLabel-root': {
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '1rem',
          marginLeft: '1rem',
          transition: 'top 0.15s ease, transform 0.15s ease',
          '&.MuiInputLabel-shrink': {
            top: '-8px',
            transform: 'translateY(0) scale(0.75)'
          }
        }
      }
    }
  }
}

export default components
