# output management

## 目录结构

```dos?linenums
|- /dist    // `npx webpack` 命令执行后生成的生产环境的代码文件
  |- [hash].svg
  |- app_[hash].bundle.js
  |- helloWorld_[hash].bundle.js
  |- index.html
|- /node_modules    // 依赖模块文件夹
|- /public    // 静态资源
  |- /imgs
    |- loading.svg
  |- base.css
  |- index.html   // 单页面入口
|- /src     // 开发环境的源代码文件
  |- bar.js
  |- helloWorld.js
  |- main.js    // 脚本入口
|- package.json    // npm 包管理器， 执行 `npx webpack` ，将 `"main": "index.js"` 将 `src/index.js` 作为入口点，生成 `dist/main.js`
|- README.md
|- webpack.config.js    // 配置打包件
```

## 用法

### 准备工作

- 安装依赖

  ```dos?linenums
  npm install --save-dev webpack webpack-cli

  npm install --save-dev style-loader css-loader

  npm install --save-dev file-loader
  ```

### 配置 HtmlWebpackPlugin ，避免手动添加

- 安装依赖

  ```dos?linenums
  npm install --save-dev html-webpack-plugin
  ```

- 配置 `webpack.config.js`

  ```javascript?linenums
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  module.exports = {
    entry: {
      app: './src/main.js',
      helloWorld: './src/helloWorld.js'
    },
    plugins: [
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
  ```

- `npx webpack` 生成 `dist` 目录

- `google-chrome dist/index.html` 查看页面样式是否生效

### 配置 CleanWebpackPlugin ，避免手动删除 dist 目录

- 安装依赖

  ```dos?linenums
  npm install --save-dev clean-webpack-plugin
  ```

- 配置 `webpack.config.js`，注意 `new CleanWepackPlugin()` 接收的是个对象 `{}`，而不是数组 `[]`

  ```javascript?linenums
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
  ```

- 修改 `src` 下的任意文件，重新执行 `npx webpack` ，看 `dist` 目录下是否先清空再生成新文件
