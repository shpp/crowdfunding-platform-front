const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function (env) {
    const config = require('./webpack.default.config')(env);
    config.mode = 'production';
    config.optimization = {
        ...(config.optimization || {}),
        minimizer: [
            new TerserJSPlugin({
                sourceMap: true,
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
    };
    config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
    return config;
};