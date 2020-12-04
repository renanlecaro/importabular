const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production'

const CopyPlugin = require("copy-webpack-plugin");

const common={

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true
          }
        }
      }
    ],
  },
  optimization: {
    minimize: isProd,
  },
  stats: 'errors-only',
}

const docExport= {
  entry: './src/demo/demo.js',
    output: {
  filename: 'main.js',
    path: path.resolve(__dirname, 'docs'),
},
  devServer: {
    contentBase: './docs',
      port: 1234,
      open: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),

    new HtmlWebpackPlugin({
      template:'src/demo/index.ejs',
      scriptLoading:'defer'
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/demo/public", to: "." }
      ],
    }),


],
...common
}

function libExport({filename, mangle}) {
  return {
    ...common,
    entry:{
      index:'./src/index.js',
      withHeaders:'./src/withHeaders.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      library: 'Importabular',
    },
    plugins: [
      new CleanWebpackPlugin(),
    ],

  }
}
module.exports = [
  docExport,
  isProd && libExport({
    filename:"",
    mangle:{}
  })
].filter(i=>i)