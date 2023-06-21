/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            primary: '#FFD21D',
            'primary-dark': '#FCA10F',
            'primary-light': '#FFE747',
            accent: '#1D6AFF',
            negative: '#FF2B1D',
            warning: '#FFC01D',
            postive: '#0BD15B',
            'gray-0': '#FFFFFF',
            'gray-50': '#F5F5F5',
            'gray-100': '#EEEEEE',
            'gray-300': '#D5D5D5',
            'gray-500': '#A2A2A2',
            'gray-600': '#6F6F6F',
            'gray-700': '#494949',
            'gray-900': '#090909',
        },
        extend: {
            fontFamily: {
                ['suit-regular']: ['SUIT-Regular'],
                ['suit-bold']: ['SUIT-Bold'],
                ['suit-medium']: ['SUIT-Medium'],
            },
            boxShadow: {
                normal: '0px -1px 18px rgba(0, 0, 0, 0.07)',
            },
            borderColor: {
                gray: '#D5D5D5',
            },
        },
    },
    plugins: [require('tailwindcss-safe-area')],
};
