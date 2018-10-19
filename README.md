# reload-server-require

[![NPM](https://nodei.co/npm/reload-server-require.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/reload-server-require/)

> 用于重载监听文件的 `require(lib)`
> 主要用于服务端渲染 ( SSR ) 时，数据源发生变法后， 服务端无需重启即可获取到新数据源

安装

```bash
  npm i reload-server-require --save-dev
```

```bash
  yarn add reload-server-require -D
```

使用

```js
// v 1.x
// example/server.js
const dir = path.resolve(process.cwd(), './example/stores/');
require('reload-server-require')(dir, null, (status) => {
  const createStore = require('./stores');
  if (createStore && typeof createStore === 'function') {
    const stores = createStore();
    console.log('watch----->', stores);
  }
});

// v 2.x
// add timeout option
// example/server.js
const dir = path.resolve(process.cwd(), './example/stores/');
const options = {
  ignoreInitial: true, // default true
  timeout: 20, // default 20
  ...// some as chokidar
}
require('reload-server-require')([dir], options || null, (status) => {
  // 此回调函数必须添加， 否则不能成功
  // 同时不能对监听文件在同一文件下使用import
  // 具体使用用例参考下面的 server-side-render demo
  const createStore = require('./stores');
  if (createStore && typeof createStore === 'function') {
    const stores = createStore();
    console.log('watch----->', stores);
  }
});
```

[server-side-render demo](https://github.com/Liuqing650/webpack-server/blob/master/src/utils/ssr-hot-server.js)
