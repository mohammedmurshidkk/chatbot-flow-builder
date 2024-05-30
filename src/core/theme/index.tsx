import { extendTheme } from '@chakra-ui/react';

const appTheme = extendTheme({
  colors: {
    brand: {
      100: '#E3F2FD',
      200: '#BBDEFB',
      300: '#90CAF9',
      400: '#64B5F6',
      500: '#42A5F5',
      600: '#2196F3',
      700: '#2C5282',
      800: '#125790',
      900: '#0E4680',
    },
    secondary: {
      light: '#97A2B1',
      main: '#8592A3',
      dark: '#798594',
      contrastText: 'white',
    },
  },
});

export default appTheme;
