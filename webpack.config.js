const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname,//path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
