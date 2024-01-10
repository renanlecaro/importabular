const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production'
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');



const CopyPlugin = require("copy-webpack-plugin");

const common={
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
    publicPath: '/',
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'docs'),
    },
    port: 1234,
    open: true,
    allowedHosts: "all",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template:'src/demo/index.ejs',
	  scriptLoading: 'blocking',
    }),
    new HTMLInlineCSSWebpackPlugin(),
    new HtmlInlineScriptPlugin(),
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
    entry:'./src/index.js',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      libraryExport: "default" ,
      libraryTarget: 'umd',
      library: 'Importabular',
    },
    mode: 'production',
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