/**
 * Webpack dev config
 */

const merge = require('webpack-merge');
const webpack = require('webpack');

const common = require('./webpack.common');

const devConfig = merge(common, {
	mode: 'development',
	devServer: {
		contentBase: './dist',
		host: 'localhost',
		hot: true,
		historyApiFallback: true,
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
});

module.exports = devConfig;
