const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  	entry:{
  		script :  './src/scripts/index.js',
  		style : './src/styles/style.js'
  	},
  	devtool : "eval",
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
	    loaders: [
			{ test: /\.scss$/, loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			{ test: /\.js$/,exclude: /node_modules/,loader: 'babel-loader'}
		]
	},
	plugins: [
        new ExtractTextPlugin("style.bundle.css")
    ]
};