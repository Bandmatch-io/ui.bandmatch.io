const { colors } = require('tailwindcss/defaultTheme')

// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      primary: {
        100: '#73A7C6',
        200: '#3C7BA0',
        300: '#196795',
        400: '#0A4A6F',
        500: '#03304B'
      },
      secondary: {
        100: '#8F7DCE',
        200: '#5E47AD',
        300: '#3F23A1',
        400: '#291278',
        500: '#170751'
      },
      tertiary: {
        100: '#95E680',
        200: '#64D447',
        300: '#3BC417',
        400: '#239305',
        500: '#156300'
      },
      complementary: {
        100: '#FFCC8E',
        200: '#FBB054',
        300: '#E98D1B',
        400: '#AF6306',
        500: '#764100'
      },
      gray: {
        100: '#DDDDEE',
        200: '#BBBBCC',
        300: '#9999AA',
        400: '#777788',
        500: '#555566'
      },
      white: '#ffffff',
      black: '#000000',
      offwhite: '#e0e0e0'
    }
  }
}