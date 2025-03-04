import { createTheme } from '@mui/material/styles';

// Definir el tema
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2498ff',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff2499',
    },
    error: {
      main: '#ed433a',
    },
    warning: {
      main: '#fdd76b',
    },
    info: {
      main: '#2498ff',
    },
    success: {
      main: '#4ddb4d',
    },
    divider: '#274967',
    background: {
      paper: '#ffffff',
      default: '#edf7fd',
    },
    text: {
      secondary: '#ffffff',
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#274967', // Color del checkbox
          '&.Mui-checked': {
            color: '#2498ff', // Color del checkbox cuando está marcado
          },
        },
      },
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});