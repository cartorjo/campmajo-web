module.exports = {
    mode: 'jit',
    purge: {
        enabled: true,
        content: [
            './views/**/*.ejs',
            './src/**/*.ts'
        ]
    },
    content: [
        './views/**/*.ejs',
        './src/**/*.ts'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: []
}