export const COLORS = {
  primary: '#FFD700', // Gold
  primaryDark: '#DAA520', // Golden Rod
  secondary: '#FFF8DC', // Corn Silk
  black: '#000000',
  white: '#FFFFFF',
  gray: '#808080',
  lightGray: '#D3D3D3',
  danger: '#FF6347', // Tomato
  success: '#32CD32', // Lime Green
  background: {
    light: '#FFFFFF',
    dark: '#121212',
  },
  text: {
    light: '#000000',
    dark: '#FFFFFF',
  }
};

export const FONT = {
  regular: 'normal' as const,
  medium: '500' as const,
  bold: 'bold' as const,
};

export const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
}; 