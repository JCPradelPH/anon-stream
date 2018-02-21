const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const debug = process.env.NODE_ENV !== "production";
module.exports = {
  entry: {
    app: ['babel-polyfill','./src/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['env','stage-0','react'],
        plugins: [
          'react-html-attrs',
          'transform-class-properties',
          'transform-decorators-legacy'
        ]
      }
    },
    {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
    },
    {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
          },
        },
      ],
    }]
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: debug ? "inline-sourcemap" : null,
  plugins: debug ? [
    new Dotenv()
  ] : [
    new Dotenv(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle:false,
      sourcemap: false
    }),
  ]
};
