const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './public/stylesheets/style.scss', // Entry point for SCSS
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|webp)$/, // Handle images
                type: 'asset/resource', // Use Webpack's asset/resource module type for images
                generator: {
                    filename: 'assets/[name][ext]', // Output images to dist/assets
                },
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        })
    ],
    mode: 'production'
};