const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = {
  entry: {
    polyfill: '@babel/polyfill',
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[id].chunk.js'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': './src'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', { loader: 'css-loader' }]
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      chunksSortMode: 'dependency'
    })
    // new WasmPackPlugin({
    //   crateDirectory: path.resolve(__dirname, './wasm'),
    //   forceMode: 'production'
    // }),
    // // Have this example work in Edge which doesn't ship `TextEncoder` or
    // // `TextDecoder` at this time.
    // new webpack.ProvidePlugin({
    //   TextDecoder: ['text-encoding', 'TextDecoder'],
    //   TextEncoder: ['text-encoding', 'TextEncoder']
    // })
  ],
  mode: 'development'
}
module.exports = {
  entry: {
    polyfill: '@babel/polyfill',
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[id].chunk.js',
    publicPath: process.env.production === 'prod' ? 'it30-image-process' : '/'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      //   vue$: 'vue/dist/vue.runtime.js',
      '@': './src'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', { loader: 'css-loader' }]
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      chunksSortMode: 'dependency'
    })
    // new WasmPackPlugin({
    //   crateDirectory: path.resolve(__dirname, './wasm'),
    //   forceMode: 'production'
    // }),
    // // Have this example work in Edge which doesn't ship `TextEncoder` or
    // // `TextDecoder` at this time.
    // new webpack.ProvidePlugin({
    //   TextDecoder: ['text-encoding', 'TextDecoder'],
    //   TextEncoder: ['text-encoding', 'TextEncoder']
    // })
  ],
  mode: 'development'
}

module.exports = (env, argv) => {
  config.output.publicPath =
    argv.mode === 'production' ? '/it30-image-process/' : '/'
  return config
}
