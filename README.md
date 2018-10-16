# reload-server-require

[![NPM](https://nodei.co/npm/reload-server-require.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/reload-server-require/)
用于重载监听文件的 `require(lib)`

主要用于服务端渲染 ( SSR ) 时，数据源发生变法后， 服务端无需重启即可获取到新数据源

使用

```js
// example/server.js
const dir = path.resolve(process.cwd(), './example/stores/');
require('reload-server-require')(dir, null, (status) => {
  const createStore = require('./stores');
  if (createStore && typeof createStore === 'function') {
    const stores = createStore();
    console.log('watch----->', stores);
  }
});
```
