const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './public/stylesheets/style.scss', // Entry point for SCSS
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js', // Output bundled JS (if needed in the future)
    },
    module: {
        rules: [
            {
                test: /\.scss$/, // Process SCSS files
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS into separate files
                    'css-loader', // Translates CSS into CommonJS
                    'sass-loader' // Compiles SCSS to CSS
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|webp)$/, // Handle images
                type: 'asset/resource', // Built-in asset/resource module for copying images
                generator: {
                    filename: 'assets/[name][ext]', // Output images in dist/assets
                },
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css', // Output CSS file
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public'), // Copy everything from public
                    to: path.resolve(__dirname, 'dist'), // Destination: dist folder
                    globOptions: {
                        ignore: ['**/stylesheets/**'], // Ignore the SCSS files since Webpack handles them separately
                    },
                },
            ],
        }),
    ],
    mode: 'production' // Set Webpack mode to production
};