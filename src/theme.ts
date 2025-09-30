
import { extendTheme, ThemeConfig, SystemStyleFunction } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#e6fffa',
      100: '#b2f5ea',
      200: '#81e6d9',
      300: '#4fd1c7',
      400: '#38b2ac',
      500: '#319795',
      600: '#2c7a7b',
      700: '#285e61',
      800: '#234e52',
      900: '#1d4044',
    },
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  breakpoints: {
    base: '0px',
    sm: '480px',
    md: '768px',
    lg: '992px',
    xl: '1280px',
    '2xl': '1536px',
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
        transition: 'background-color 0.2s, color 0.2s',
      },
      '*': {
        borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'md',
        transition: 'all 0.2s ease-in-out',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            transform: 'translateY(-1px)',
            boxShadow: 'md',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
            borderColor: 'brand.600',
          },
        },
      },
    },
    Card: {
      baseStyle: (props: any) => ({
        container: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          borderRadius: 'lg',
          boxShadow: 'sm',
          border: '1px solid',
          borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
          transition: 'all 0.2s ease-in-out',
          _hover: {
            boxShadow: 'md',
            transform: 'translateY(-1px)',
          },
        },
      }),
    },
    Input: {
      baseStyle: (props: any) => ({
        field: {
          bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
          borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.300',
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
          },
        },
      }),
    },
    Alert: {
      baseStyle: (props: any) => ({
        container: {
          borderRadius: 'md',
          border: '1px solid',
          borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.200',
        },
      }),
    },
    Spinner: {
      baseStyle: {
        color: 'brand.500',
      },
    },
  },
  layerStyles: {
    card: {
      bg: 'white',
      boxShadow: 'sm',
      borderRadius: 'lg',
      border: '1px solid',
      borderColor: 'gray.200',
    },
    'card-dark': {
      bg: 'gray.800',
      boxShadow: 'sm',
      borderRadius: 'lg',
      border: '1px solid',
      borderColor: 'gray.700',
    },
  },
  textStyles: {
    heading: {
      fontFamily: 'heading',
      fontWeight: 'bold',
      lineHeight: 'shorter',
    },
    body: {
      fontFamily: 'body',
      fontWeight: 'normal',
      lineHeight: 'base',
    },
  },
});

export default theme;