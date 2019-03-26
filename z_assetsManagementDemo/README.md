# assets management

## 目录结构

```dos?linenums
|- /dist    // `npx webpack` 命令执行后生成的生产环境的代码文件
  |- bundle.js
  |- [hash].ttf
  |- [hash].svg
|- node_modules
|- /src     // 开发环境的源代码文件
  |- /assets
    |- ball.svg
    |- base.css
    |- index.css
    |- 淘气马丁学拼音装饰.ttf
  |- /utils
    |- bar.js
  |- index.js
|- index.html   // 引入 `/dist/bundle.js`, `google-chrome index.html` 命令执行打开谷歌浏览器预览
|- package.json
|- README.md
|- webpack.config.js    // webpack 的设置文件，设置打包的规则，包括输入、输出等
```

## 用法

### 加载 CSS

- 安装依赖模块

  ```dos?linenums
  npm install webpack webpack-cli --save-dev

  npm install --save-dev style-loader css-loader
  ```

- 配置 `webpack.config.js`

  ```javascript?linenums
  const path = require('path')

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  }
  ```

- 建立静态文件夹 `assets`

- 建立基本样式 `assets/base.css`

- `npx webpack` 生成 `dist` 目录

- 建立页面 `index.html` ，引入 `dist/bundle.js`

- `google-chrome index.html` 查看页面样式是否生效

### 加载图片

- 安装依赖

  ```dos?linenums
  npm install --save-dev file-loader
  ```

- 配置 `webpack.config.js`

  ```javascript?linenums
  const path = require('path')

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: 'dist/' // 静态资源的路径
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

- 建立图片文件 `assets/ball.svg`

- `import` 引入图片或 `background-image: url()` 引入图片

  ```javascript?linenums
  import ballIcon from './assets/ball.svg'

  window.onload = function() {
    const imgEl = document.createElement('img')
    imgEl.src = ballIcon
    document.body.appendChild(imgEl)
  }
  ```

  ```css?linenums
  #my-icon {
    width: 200px;
    height: 200px;
    background-image: url('ball.svg');
    background-size: 100%;
    background-repeat: no-repeat;
  }
  ```

- `npx webpack` 生成 `dist` 目录

- `google-chrome index.html` 查看页面样式是否生效

### 加载字体

- 配置 `webpack.config.js`

  ```javascript?linenums
  const path = require('path')

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: 'dist/'
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
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader']
        }
      ]
    }
  }
  ```

- 建立字体文件 `assets/淘气马丁学拼音装饰.ttf`

- `font-face` 引入字体

  ```css?linenums
  @font-face {
    font-family: '淘气马丁学拼音装饰';
    src: url('淘气马丁学拼音装饰.ttf');
  }

  .main {
    font-family: '淘气马丁学拼音装饰';
  }
  ```

- `npx webpack` 生成 `dist` 目录

- `google-chrome index.html` 查看页面样式是否生效

### 加载 `xml` , '.csv' 文件

- 安装依赖

  ```dos?linenums
  npm install --save-dev xml-loader csv-loader
  ```

  注意 `csv-loader` 可能需要依赖 `npm i papaparse --save-dev`

- 配置 `webpack.config.js`

  ```javascript?linenums
  const path = require('path')

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: 'dist/'
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
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader']
        },
        {
          test: /\.xml$/,
          use: ['xml-loader']
        },
        {
          test: /\.(csv|tsv)$/,
          use: ['csv-loader']
        }
      ]
    }
  }
  ```

- 建立文件 `assets/data.xml` 和 `assets/database.csv`

- `import` 引入 `.xml` 和 `.csv` 文件

  ```javascript?linenums
  import database from './assets/database.csv'
  import data from './assets/data.xml'

  window.onload = function() {
    // 加载 xml 文件
    const xmlEl = document.getElementById('xml'),
      sectionEl = document.createElement('section')
    sectionEl.innerText = JSON.stringify(data)
    xmlEl.appendChild(sectionEl)
    console.log(data)

    // 加载 csv
    const csvEl = document.getElementById('csv'),
      sectionEl1 = document.createElement('section')
    sectionEl1.innerText = JSON.stringify(database)
    csvEl.appendChild(sectionEl1)
    console.log(database)
  }
  ```

- `npx webpack` 生成 `dist` 目录

- `google-chrome index.html` 查看页面样式是否生效
