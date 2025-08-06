/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                // Clinical Professional Theme Colors
                primary: {
                    50: '#E6F3FA',
                    100: '#CCE7F5',
                    200: '#99CFEB',
                    300: '#66B7E1',
                    400: '#339FD7',
                    500: '#0077B6',
                    600: '#005A87',
                    700: '#003D58',
                    800: '#002029',
                    900: '#001014',
                },
                secondary: {
                    50: '#E6F9FD',
                    100: '#CCF3FB',
                    200: '#99E7F7',
                    300: '#66DBF3',
                    400: '#33CFEF',
                    500: '#00B4D8',
                    600: '#0090AD',
                    700: '#006C82',
                    800: '#004857',
                    900: '#00242B',
                },
                accent: '#90E0EF',
                background: {
                    DEFAULT: '#FFFFFF',
                    secondary: '#F8F9FA',
                },
                surface: '#F8F9FA',
                error: '#DC3545',
                success: '#28A745',
                warning: '#FFA000',
                text: {
                    primary: '#212529',
                    secondary: '#6C757D',
                },
            },
            fontFamily: {
                'sans': ['Roboto', 'system-ui'],
                'heading': ['Roboto', 'system-ui'],
            },
            borderRadius: {
                'xs': '4px',
                'sm': '4px',
                'md': '4px',
                'lg': '4px',
            },
        },
    },
    plugins: [],
}
