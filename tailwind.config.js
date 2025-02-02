/** @type {import('tailwindcss').Config} */
export default{
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
      },
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'serif']
      },
      fontWeight: {
        medium: 500
      },
      gridTemplateColumns: {
        'auto-fit-minmax': 'repeat(auto-fit, minmax(327px, 1fr))'
      },
      boxShadow: {
        'custom-1': '0px 5px 28px rgba(0, 0, 0, 0.08)'
      },
      margin: {
        '15px': '15px'
      }
    },
    screens: {
      sm: '730px',
      desktop: '890px',
      md: '769px',
      mobile: { max: '889px' },
      'mobile-sm': { max: '375px' }
    },
    backgroundOpacity: {
      30: '0.3'
    }
  },
  plugins: [
  ]
}

