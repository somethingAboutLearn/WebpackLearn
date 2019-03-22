# getting started demo

## 目录结构

```dos?linenums
|- /dist    // `npx webpack` 命令执行后生成的生产环境的代码文件
  |- main.js
|- /node_modules    // 依赖模块文件夹
|- /src     // 开发环境的源代码文件
  |- bar.js
  |- index.js
|- index.html   // 引入 `/dist/main.js`, `google-chrome index.html` 命令执行打开谷歌浏览器预览
|- README.md
|- package.json    // npm 包管理器， 执行 `npx webpack` ，将 `"main": "index.js"` 将 `src/index.js` 作为入口点，生成 `dist/main.js`
```

## 用法

- 将 `./src/index.js` 作为入口文件
- 将 `./src/bar.js` 模块在 `./src/index.js` 中引入， `innerHTML()` `bar` 模块的内容
- `npm install webpack -S -D` ， `npm install webpack-cli -S -D` ， 安装 webpack 和 webpack-cli ，并加入依赖项
- 执行 `npx webpack` 命令，生成 `dist` 目录及输出文件 `main.js`
- 在 `index.html` 中引入输出文件 `main.js` ， `google-chrome index.html` 在浏览器中查看
