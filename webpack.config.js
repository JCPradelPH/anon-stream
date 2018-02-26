const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const debug = process.env.NODE_ENV !== "production";
const extractSass = new ExtractTextPlugin({
    filename: "style.css",
    disable: debug,
});
module.exports = {
  entry: {
    app: ['babel-polyfill','./src/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
    publicPath: '/'
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
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
        test: /(\.scss|\.css)$/,
        use: extractSass.extract({
          fallback: 'style-loader',
          use: [
              {
                  loader: 'css-loader',
                  options: {
                      sourceMap: true
                  }
              },
              {
                  loader: 'sass-loader',
                  options: {
                      sourceMap: true,
                      outFile: 'css/style.css',
                      outputStyle: 'expanded',//or nested or compact or compressed
                  }
              }
          ],
        })
      },
      {
        test: /\.(jpe?g|gif|png)$/,
        loader: 'file-loader?emitFile=false&name=[path][name].[ext]'
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  devtool: debug ? "inline-sourcemap" : null,
  plugins: debug ? [
    new Dotenv(),
    extractSass
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
