# simple demo

## 目录结构

```dos?linenums
|- /dist    // `npx webpack` 命令执行后生成的生产环境的代码文件
  |- bundle.js
|- /src     // 开发环境的源代码文件
  |- bar.js
  |- index.js
|- index.html   // 引入 `/dist/bundle.js`, `google-chrome index.html` 命令执行打开谷歌浏览器预览
|- README.md
|- webpack.config.js    // webpack 的设置文件，设置打包的规则，包括输入、输出等
```

## 用法

- `npm` 初始化，安装 webpack 和 webpack-cli

```dos?linenums
npm init -y
npm install webpack webpack-cli --save-dev
```

- 将 `./src/index.js` 作为入口文件
- 将 `./src/bar.js` 模块在 `./src/index.js` 中引入， `document.write()` `bar` 模块的内容
- 执行 `npx webpack` 命令，生成 `dist` 目录及输出文件 `bundle.js`
- 在 `index.html` 中引入输出文件 `bundle.js` ， `google-chrome index.html` 在浏览器中查看
