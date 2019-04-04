const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWepackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: './src/main.js',
    helloWorld: './src/helloWorld.js'
  },
  plugins: [
    new CleanWepackPlugin(),
    new HtmlWebpackPlugin({
      title: 'output management webpack',
      template: './public/index.html'
    })
  ],
  output: {
    filename: '[name]_[hash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  }
}
