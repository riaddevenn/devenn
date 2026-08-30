/** @type {import('tailwindcss').Config} */

// Design tokens mirrored from Figma (file tjOIcv0Kd9deYag0FfnBC6).
// Names match the Figma variable names so the design and the code stay in sync.
export default {
  theme: {
    extend: {
      colors: {
        // foundation
        dark: {
          50: '#E8E7ED',
          100: '#B7B6C6',
          200: '#9592AA',
          300: '#646184', // body text
          500: '#181347', // headings
          800: '#0D0A27', // hero + footer background
        },
        // primary brand
        purple: {
          500: '#AA61F0',
          600: '#9B58DA', // primary button
          800: '#5E3584',
        },
        blue: {
          50: '#F0F7FE',
          500: '#64ACF3',
        },
        yellow: {
          500: '#FFD152',
        },
        gray: {
          50: '#FDFDFE',
          200: '#F4F4FA',
          600: '#D3D2DE',
        },
        // traffic-light dots used in the product mockup browser chrome
        web: {
          close: '#F3605C',
          minimize: '#F8BE39',
          maximize: '#50C845',
        },

        // required-field asterisks and form validation messages
        error: '#D92D20',
      },
      boxShadow: {
        // the three-layer elevation on the contact modal
        modal:
          '0px 20px 24px -4px rgba(10, 13, 18, 0.08), 0px 8px 8px -4px rgba(10, 13, 18, 0.03), 0px 3px 3px -1.5px rgba(10, 13, 18, 0.04)',
      },
      fontFamily: {
        // Gilroy is licensed. using Figtree is stand-in for now
        sans: ['Figtree', 'Gilroy', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
      borderRadius: {
        xs: '4px',
      },
      spacing: {
        xxs: '2px',
        sm2: '6px',
      },
    },
  },
};
