'use strict';

const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require("path");
const PROD = (process.env.NODE_ENV === 'production');
const packageData = require("./package.json");

let plugins = [
  new webpack.DefinePlugin({
    __VERSION__: JSON.stringify(packageData.version),
    __NAME__: JSON.stringify(packageData.name)
  }),
  new webpack.optimize.ModuleConcatenationPlugin()
];

if (PROD) {
  plugins.push(new UglifyJsPlugin({
    sourceMap: true,
    uglifyOptions: {
      mangle: {
        toplevel: true,
        eval: true
      }
    }
  }));
}

module.exports = {
  context: __dirname + "/src",
  entry: {
    "working": "working.js",
    "notworking": "notworking.js"
  },
  output: {
    path: __dirname + "/dist",
    filename: '[name].js'
  },
  plugins: plugins,
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: "babel-loader"
      }],
      exclude: [
        /node_modules/
      ]
    }]
  },
  devServer: {
    contentBase: __dirname + "/src"
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules"
    ]
  }
};
