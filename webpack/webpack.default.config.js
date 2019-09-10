const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function (env) {
    return {
        entry: [
            path.join(__dirname, '..', 'frontend', 'index.js'),
            path.join(__dirname, '..', 'assets', 'styles', 'index.scss'),
        ],
        output: {
            path: path.join(__dirname, '..', 'dist'),
            filename: 'js/bundle.js',
        },
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: process.env.NODE_ENV === 'development',
                            },
                        },
                        'css-loader',
                        'sass-loader',
                    ],
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: 'styles/main.css',
                publicPath: '/'
            }),
        ],
        resolve: {
            modules: [
                path.resolve('./node_modules'),
                path.join(__dirname, '..', 'frontend')
            ],
            extensions: ['.js', '.jsx']
        }
    };
};
