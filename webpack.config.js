const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const util = require('util');
var HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, 'build'),
		filename: 'bundle.js'
  },
  module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.js/
			},
			{
        loader: ExtractTextPlugin.extract({
            loader: 'css-loader',
        }),
        exclude: /\.\//,
				test: /\.css$/
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: { limit: 40000 }
					},
					'image-webpack-loader'
				]
			}
		]
	},
  plugins: [
    new ExtractTextPlugin('App.css'),
    new ExtractTextPlugin('index.css'),
    new HtmlWebpackPlugin({
        template: 'src/index.html'
    })
  ]
};


module.exports = config;

exports.puts = util.deprecate(function() {
  for (var i = 0, len = arguments.length; i < len; ++i) {
    process.stdout.write(arguments[i] + '\n');
  }
}, 'util.puts: Use console.log instead');
