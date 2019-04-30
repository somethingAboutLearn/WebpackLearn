# code splitting

## 目录结构

```dos?linenums
|- /dist    // `npx webpack` 命令执行后生成的生产环境的代码文件
  |- index.html
  |- J_[hash].bundle.js
  |- L_[hash].bundle.js
  |- J~L_[hash].bundles.js    //  共同的依赖提取生成的新文件
|- /node_modules    // 依赖模块文件夹
|- /public    // 静态资源
  |- index.html   // 单页面入口
|- /src     // 开发环境的源代码文件
  |- A.js
  |- index.js
  |- J.js
  |- L.js
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

  npm install --save-dev webpack-dev-server
  ```

### 配置 `webpack-dev-server` ，避免每次修改文件保存后手动打包（ `npm run build` ）。

- 配置 `package.json` ， 配置 `"watch": "webpack --watch"` 达到添加脚本启动 `webpack` 的监视模式（`watch mode`）。

  ```json?linenums
  {
    "name": "z_codesplittingdemo",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch"
    },
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "clean-webpack-plugin": "^2.0.1",
      "html-webpack-plugin": "^3.2.0",
      "webpack": "^4.30.0",
      "webpack-cli": "^3.3.1",
      "webpack-dev-server": "^3.3.1"
    }
  }
  ```

- 执行命令 `npm run watch`
- 修改 `main.js` 引入的某一文件，查看 `dist/` 目录是否为修改后打包的文件

### 配置 `webpack-dev-server` ，实现浏览器打开 `dist/index.html` 在 `http://localhost:8080`

- 配置 `webpack.config.js` ，添加 `devServer: { contentBase: './dist' }` 。

  ```javascript?linenums
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CleanWebpackPlugin = require('clean-webpack-plugin')

  module.exports = {
    entry: {
      J: './src/J.js',
      L: './src/L.js'
    },
    devServer: {
      contentBase: './dist'
    },
    output: {
      filename: '[name]_[hash].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'code splitting',
        template: './public/index.html'
      })
    ]
  }
  ```

- 配置 `package.json` ,添加 `"serve": "webpack-dev-server --open"` 。

  ```json?linenums
  {
    "name": "z_codesplittingdemo",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch",
      "build": "webpack",
      "serve": "webpack-dev-server --open"
    },
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "clean-webpack-plugin": "^2.0.1",
      "html-webpack-plugin": "^3.2.0",
      "webpack": "^4.30.0",
      "webpack-cli": "^3.3.1",
      "webpack-dev-server": "^3.3.1"
    }
  }
  ```

- 执行命令 `npm run serve` ，自动打开浏览器，进入 `http://localhost:8080` 。
- 修改 `main.js` 引入的某一文件，浏览器将会自动刷新。

### 去除多次引用，将共同的依赖提取到一个新文件中。

- 配置 `webpack.config.js` ，配置 `optimization: { splitChunks: { chunks: 'all', minSize: 66 } }` ，注意 `minSize` 的值，也就是被引用的文件要生成新块的最小字节数。

  ```javascript?linenums
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CleanWebpackPlugin = require('clean-webpack-plugin')

  module.exports = {
    entry: {
      J: './src/J.js',
      L: './src/L.js'
    },
    devServer: {
      contentBase: './dist'
    },
    output: {
      filename: '[name]_[hash].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'code splitting',
        template: './public/index.html'
      })
    ],
    optimization: {
      splitChunks: {
        chunks: 'all', //  异步和非异步可否共享块  all async initial
        minSize: 66 //  共享块的原始最小字节，引用文件大小 <= 66 打包时会提取共同引用的文件生成新文件
        // minSize: 67 //  共享块的原始最小字节，引用文件大小 > 66 打包时不会提取共同引用的文件，在各自文件中重复引用
      }
    }
  }
  ```

- 执行 `npm run build` ，查看是否有 `dist/J~L_[hash].js` 文件。

### 动态代码拆分（通过方法 `import()` 按需引入模块，与 `import default from './A'` 有区别）

- 配置 `webpack.config.js`

  ```javascript?linenums
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CleanWebpackPlugin = require('clean-webpack-plugin')

  module.exports = {
    entry: {
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
  }
  ```

- 编写 `index.js`

  ```javascript?linenums
  // 1. .then()
  // function getA() {
  //   return import('./A').then(({ default: a }) => {
  //     console.log('a => ', a)
  //     return a
  //   })
  // }

  // getA().then(func => {
  //   console.log('func => ', func)
  //   func()
  // })

  // 2. async await
  async function getA() {
    let res = await import('./A')
    console.log('getA res => ', res)
    return res.default()
  }

  getA()
  ```

- 执行 `npm run build` 打包

- 打包成功后，查看 `dist` 目录下是否有引入文件 `A.js` 的新文件，如 `1.bundle.js` 。
