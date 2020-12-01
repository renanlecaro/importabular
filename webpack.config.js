const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production'

const TerserPlugin = require("terser-webpack-plugin");


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
    new HtmlWebpackPlugin({
      template:'src/demo/index.ejs',
      scriptLoading:'defer'
    })
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
    filename: filename,
    path: path.resolve(__dirname, 'dist'),
    library: 'Importabular',
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  optimization: {
    runtimeChunk: true ,
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        ecma: 5,
        module:true,
        compress:true,
        mangle,
      },
    }),],
  },
}
}
// https://webpack.js.org/concepts/targets/#multiple-targets
module.exports = [
  docExport,
  isProd && libExport({
    filename:"[name].js",
    mangle:{}
  })
  // isProd && libExport({
  //   filename:"[name]-min.js",
  //   mangle:{  properties: {
  //       regex:/^_/
  //     }}
  // }),
].filter(i=>i)