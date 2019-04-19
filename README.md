# webpack Learn

## 每个 Demo 都需安装好 webpack 和 webpack-cli

- `npm` 初始化，安装 webpack 和 webpack-cli

```dos?linenums
npm init -y
npm install webpack webpack-cli --save-dev
```

## 实例

### [z_simpleDemo](https://github.com/somethingAboutLearn/WebpackLearn/tree/master/z_simpleDemo)

> webpack 的最小一个示例。
> 通过在 `webpack.conf.js` 里简单的配输入输出，然后在页面中引入打包后的文件查看。
> 了解一下 webpack 是什么，以及它是如何工作的。

### [z_gettingStartDemo](https://github.com/somethingAboutLearn/WebpackLearn/tree/master/z_gettingStartDemo)

> 没有 `webpack.conf.js` 文件，通过 `package.json` 中 `"main"` 字段，设置 webpack 的入口文件。

### [z_assetsManagementDemo](https://github.com/somethingAboutLearn/WebpackLearn/tree/master/z_assetsManagementDemo)

> 静态资源载入方式。
> 加载 css ，用加载器 `style-loader`、`css-loader` 。
> 加载图片、字体 ，用文件加载器 `file-loader` 。
> 加载 .xml 文件，用 xml 加载器 `xml-loader` 。
> 加载 .csv 文件，用 csv 加载器 `csv-loader` 。

### [z_outputManagementDemo](https://github.com/somethingAboutLearn/WebpackLearn/tree/master/z_outputManagementDemo)

> 将打包后生成的文件自动添加到 `index.html` 中，配置 `HtmlWebpackPlugin` 插件实现。
> 每次打包前都需要先移除历史（`dist/`）目录，再生成新的目录，为了 避免手动操作（`rm -rf dist/`），配置 `CleanWebpackPlugin` 插件实现。

### [z_developmentDemo](https://github.com/somethingAboutLearn/WebpackLearn/tree/master/z_developmentDemo)

> 开发环境下便于定位客户端输出的错误，设置 `webpack` 的 `mode: 'development'` 和 `devtool: 'inline-source-map'` 。
> 修改源代码想实现自动打包，配置 `package.json` 中的脚本 `"watch": "webpack --watch"` 。
> 修改源代码或执行某个命令，自动通过浏览器打开 `http://localhost:8080` ，配置 `webpack-dev-server` 。
