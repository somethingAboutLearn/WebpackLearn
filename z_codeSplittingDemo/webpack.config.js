const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    // J: './src/J.js',
    // L: './src/L.js'
    index: './src/index.js'
  },
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: '[name]_[hash].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'code splitting',
      template: './public/index.html'
    })
  ]
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all', //  异步和非异步可否共享块  all async initial
  //     minSize: 66 //  共享块的原始最小字节，引用文件大小 <= 66 打包时会提取共同引用的文件生成新文件
  //     // minSize: 67 //  共享块的原始最小字节，引用文件大小 > 66 打包时不会提取共同引用的文件，在各自文件中重复引用
  //   }
  // }
}
