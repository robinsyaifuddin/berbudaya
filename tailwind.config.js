/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#2B6CB0',
          50: '#EDF6FF',
          100: '#D6EAFF',
          200: '#A8D3FF',
          300: '#7AB8FF',
          400: '#5D9CEC',
          500: '#3182CE',
          600: '#2B6CB0',
          700: '#2C5282',
          800: '#2A4365',
          900: '#1A365D',
        },
        secondary: {
          50: '#EDF6FF',
          100: '#D6EAFF',
          200: '#A8D3FF',
          300: '#7AB8FF',
          400: '#5D9CEC',
          500: '#3182CE',
          600: '#2B6CB0',
          700: '#2C5282',
          800: '#2A4365',
          900: '#1A365D',
        },
        gray: {
          50: '#FAFBFC',
          100: '#F5F7FA',
          200: '#E4E7EB',
          300: '#CBD2D9',
          400: '#9AA5B1',
          500: '#7B8794',
          600: '#616E7C',
          700: '#52606D',
          800: '#3E4C59',
          900: '#323F4B',
        }
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.05)',
        'button': '0 2px 8px rgba(66, 133, 244, 0.2)',
        'button-hover': '0 4px 12px rgba(66, 133, 244, 0.3)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      spacing: {
        '18': '4.5rem',
        '70': '17.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [],
}
