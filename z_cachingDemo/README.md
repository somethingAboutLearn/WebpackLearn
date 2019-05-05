# caching

## 目录结构

```dos?linenums
|- /dist    // `npx webpack` 命令执行后生成的生产环境的代码文件
  |- index.html
  |- main.[hash].js
  |- runtime.[hash].js
  |- vendors.[hash].js    // 轻易不改变的块
|- /node_modules    // 依赖模块文件夹
|- /public    // 静态资源
  |- index.html   // 单页面入口
|- /src     // 开发环境的源代码文件
  |- A.js
  |- index.js
  |- J.js
  |- K.js
  |- Q.js
|- package.json    // npm 包管理器
|- README.md
|- webpack.config.js    // 配置打包件
```

## 用法

### 准备工作

- 安装依赖

  ```dos?linenums
  npm install --save-dev webpack webpack-cli

  npm install --save-dev html-webpack-plugin

  npm install --save-dev clean-webpack-plugin
  ```

- 配置 `webpack.config.js`

  ```javascript?linenums
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CleanWebpackPlugin = require('clean-webpack-plugin')

  module.exports = {
    entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'caching',
        template: './public/index.html'
      })
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    }
  }
  ```

- 配置 `package.json`

  ```json?linenums
  {
    "name": "z_cachingDemo",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "build": "webpack"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "clean-webpack-plugin": "^2.0.1",
      "html-webpack-plugin": "^3.2.0",
      "webpack": "^4.30.0",
      "webpack-cli": "^3.3.2"
    }
  }
  ```

- 执行 `npm run build` ，查看 `dist` 目录下的文件名称
- 不做任何改变，再次执行 `npm run build` ，查看 `dist` 目录下的文件名称是否改变（与 `webpack` 的版本有关），将所有包打包为单个包(`main.[contenthash].js`)
- 即使没有改变，也建议配置 `optimization: { runtimeChunk: 'single' }`　，将 `index.js` 内引入的所有包打包为单个运行包(`runtime.[contenthash].js`)

  ```javascript?linenums
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CleanWebpackPlugin = require('clean-webpack-plugin')

  module.exports = {
    entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'caching',
        template: './public/index.html'
      })
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      runtimeChunk: 'single'
    }
  }
  ```

- 将某些不变的包分别打包为新文件，这样每次修改打包后，可以尽量减少文件名称的变化，从而减少浏览器的请求次数。如下，配置 `webpack.config.js` ，将 `src/J.js` 长期不会改变内容的文件单独打包生成新文件 `vendors.[contenthash].js` ，该文件不会轻易改变内容，则打包后的文件名称就不会改变。。由于浏览器的缓存机制，下次进来，就会先查看缓存，如果缓存中存在，则取缓存，否则发起新请求

  ```javascript?linenums
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CleanWebpackPlugin = require('clean-webpack-plugin')

  module.exports = {
    entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'caching',
        template: './public/index.html'
      })
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]src[\\/]J.js/,
            name: 'vendors',
            chunks: 'all'
          }
        },
        minSize: 60
      }
    }
  }
  ```
