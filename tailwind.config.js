/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            white: '#FFFFFF',
            black: '#000000',
            primary: '#FFD21D',
            'primary-dark': '#E9BB00',
            'primary-light': '#FFE683',
            accent: '#16B9FF',
            negative: '#FF4F60',
            warning: '#FFD12B',
            postive: '#73EF5F',
            'gray-0': '#FFFFFF',
            'gray-50': '#F5F5F5',
            'gray-100': '#EEEEEE',
            'gray-300': '#D5D5D5',
            'gray-500': '#A2A2A2',
            'gray-600': '#6F6F6F',
            'gray-900': '#090909',
        },
        extend: {
            fontFamily: {
                ['suit-regular']: ['SUIT-Regular'],
                ['suit-bold']: ['SUIT-Bold'],
                ['suit-medium']: ['SUIT-Medium'],
            },
            boxShadow: {
                normal: '-16px 16px 40px rgba(55, 54, 38, 0.2)',
            },
            borderColor: {
                gray: '#D5D5D5',
            },
        },
    },
    plugins: [require('tailwindcss-safe-area')],
};
