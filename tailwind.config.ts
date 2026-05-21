import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#E1F5EE',
          100: '#C3EBD7',
          200: '#9FE1CB',
          300: '#6BCFAF',
          400: '#3DBD94',
          500: '#1D9E75',
          600: '#0F6E56',
          700: '#085041',
          800: '#053428',
          900: '#021A14',
        },
        gray: {
          50:  '#F9F9F7',
          100: '#F1F0EC',
          200: '#E8E7E3',
          300: '#D3D1C7',
          400: '#B4B2A9',
          500: '#888780',
          600: '#5F5E5A',
          700: '#444441',
          800: '#2A2A28',
          900: '#1A1A18',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
