/**
 * Production webpack conf.
 */

const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfig = require('./webpack.common');

const prodConfig = merge(commonConfig, {
	mode: 'production',
});

module.exports = prodConfig;
