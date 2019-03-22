const path = require('path')

module.exports = {
  entry: './src/index.js',    // 输入文件
  output: {                   // 输出文件
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}