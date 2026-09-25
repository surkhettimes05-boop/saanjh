import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: {
            DEFAULT: '#8F1717',
            dark: '#7F1D1D',
            light: '#991B1B',
          },
          cream: {
            DEFAULT: '#FFF9EE',
            dark: '#F8F0E3',
          },
          gold: {
            DEFAULT: '#EFAA2B',
            light: '#F4B740',
          },
        },
        sku: {
          masoor: '#E57373',
          moong: '#81C784',
          rahar: '#FFD54F',
          chana: '#FFB74D',
          maas: '#9575CD',
          wholeChana: '#8D6E63',
          bodi: '#FF8A65',
          setoKerau: '#AED581',
          kabuli: '#D7CCC8',
          kaloBhatmas: '#424242',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
