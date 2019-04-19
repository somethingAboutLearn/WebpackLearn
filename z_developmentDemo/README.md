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

### `mode: "development"` 开发模式与 `source maps` 使用，便于错误代码查找

- 配置 `webpack.config.js` ，配置 `mode: 'development'` 和 `devtool: 'inline-source-map'` 。

  ```javascript?linenums
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CleanWepackPlugin = require('clean-webpack-plugin')

  module.exports = {
    mode: 'development',
    entry: {
      app: './src/main.js',
      helloWorld: './src/helloWorld.js'
    },
    devtool: 'inline-source-map',
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

### 配置 `webpack-dev-server` ，避免每次修改文件保存后手动打包（ `npm run build` ）。

- 配置 `package.json` ， 配置 `"watch": "webpack --watch"` 达到添加脚本启动 `webpack` 的监视模式（`watch mode`）。

  ```json?linenums
  {
    "name": "z_developmentDemo",
    "version": "1.0.0",
    "description": "",
    "main": "main.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "webpack": "^4.29.6",
      "webpack-cli": "^3.3.0"
    },
    "devDependencies": {
      "clean-webpack-plugin": "^2.0.1",
      "css-loader": "^2.1.1",
      "file-loader": "^3.0.1",
      "html-webpack-plugin": "^3.2.0",
      "style-loader": "^0.23.1"
    }
  }
  ```

- 执行命令 `npm run watch`
- 修改 `main.js` 引入的某一文件，查看 `dist/` 目录是否为修改后打包的文件

### 配置 `webpack-dev-serve` ，实现浏览器打开 `dist/index.html` 在 `http://localhost:8080`

- 安装依赖

  ```dos?linenums
  npm install --save-dev webpack-dev-server
  ```

- 配置 `webpack.config.js` ，添加 `devServer: { contentBase: './dist' }` 。

  ```javascript?linenums
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CleanWepackPlugin = require('clean-webpack-plugin')

  module.exports = {
    mode: 'development',
    entry: {
      app: './src/main.js',
      helloWorld: './src/helloWorld.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist'
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

- 配置 `package.json` ,添加 `"serve": "webpack-dev-server --open"` 。

  ```json?linenums
  {
    "name": "z_developmentDemo",
    "version": "1.0.0",
    "description": "",
    "main": "main.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch",
      "build": "webpack",
      "serve": "webpack-dev-server --open"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "webpack": "^4.29.6",
      "webpack-cli": "^3.3.0"
    },
    "devDependencies": {
      "clean-webpack-plugin": "^2.0.1",
      "css-loader": "^2.1.1",
      "file-loader": "^3.0.1",
      "html-webpack-plugin": "^3.2.0",
      "style-loader": "^0.23.1",
      "webpack-dev-server": "^3.3.1"
    }
  }
  ```

- 执行命令 `npm run serve` ，自动打开浏览器，进入 `http://localhost:8080` 。
- 修改 `main.js` 引入的某一文件，浏览器将会自动刷新。
