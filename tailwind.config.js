/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            primary: '#FFD21D',
            ['primary-dark']: '#FCA10F',
            ['primary-light']: '#FFE747',
            accent: '#1D6AFF',
            negative: '#FF2B1D',
            warning: '#FFC01D',
            postive: '#0BD15B',
        },
        extend: {
            fontFamily: {
                ['suit-regular']: ['SUIT-Regular'],
                ['suit-bold']: ['SUIT-Bold'],
            },
        },
    },
    plugins: [],
};
