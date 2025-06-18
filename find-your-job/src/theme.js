import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1565c0',        // Blu intenso
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff9800',        // Ambra/Arancione
      contrastText: '#fff',
    },
    background: {
      default: '#f5f6fa',     // Grigio chiaro
      paper: '#fff'
    },
    success: {
      main: '#43a047',
    },
    error: {
      main: '#e53935',
    },
    text: {
      primary: '#222',       // Quasi nero
      secondary: '#556070',  // Grigio-blu per dettagli
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: { fontWeight: 700, fontSize: '2.2rem', letterSpacing: '-0.5px' },
    h2: { fontWeight: 600, fontSize: '1.5rem' },
    h3: { fontWeight: 500, fontSize: '1.2rem' },
    body1: { fontSize: '1rem', fontWeight: 400 },
    button: { textTransform: 'none', fontWeight: 600 }
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          padding: '8px 24px',
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#1565c0',
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(60,60,60,0.07)',
        }
      }
    }
    // Altri override se vuoi!
  }
});

export default theme;