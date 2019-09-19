/**
 * Common build conf.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CheckerPlugin} = require('awesome-typescript-loader');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const commonConfig = {
	entry: {
		bundle: './src/index.ts',
	},
	output : {
		path: path.resolve(__dirname, 'dist'),
		chunkFilename: '[name].[hash].bundle.js',
		filename: '[name].[hash].bundle.js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'awesome-typescript-loader',
			}
		]
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		}
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CheckerPlugin(),
		new HtmlWebpackPlugin({template: './index.html'})
	]
};

module.exports = commonConfig;
