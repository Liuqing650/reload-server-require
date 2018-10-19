const express = require('express');
const path = require('path');

const app = express();
const port = 3008;

const dir1 = path.resolve(process.cwd(), './example/stores/wch1/');
const dir2 = path.resolve(process.cwd(), './example/stores/wch2/');
const callback = (status) => {
  const createStore = require('./stores');
  if (createStore && typeof createStore === 'function') {
    const stores = createStore();
    console.log('watch----->', stores);
  }
}
require('../index.js')([dir1, dir2], null, callback);
app.get('*', function(req, res) {
  const createStore = require('./stores');
  const stores = createStore();
  console.log('server------->', stores);
  res.status(200);
  res.send(`<!doctype html>\n<meta charSet="utf-8" />\n<div>stores: ${JSON.stringify(stores)}</div>`);
})
app.listen(port, function(err) {
  const openUrl = `http://localhost:${port}`;
  console.info(`==> Listening at ${openUrl}`);
});
