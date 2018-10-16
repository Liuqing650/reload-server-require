const path = require('path');
const chokidar = require('chokidar');
const invalidate = require('invalidate-module');

function initOptions(opts) {
  const options = {
    ignoreInitial: true
  };
  try {
    if (opts && Object.keys(opts).length > 0) {
      Object.keys(opts).forEach(function(key) {
        options[key] = opts[key];
      });
    }
  } catch (error) {
    console.error(error);
  }
  return options;
};

function watchServer(dir, opts, callback) {
  const options = initOptions(opts);
  const watcher = chokidar.watch(dir, options);
  watcher.on('all', (event, filename) => {
    if (callback && typeof callback === 'function') {
      callback(event, filename);
    }
    if (event !== 'add') {
      invalidate(path.resolve(filename));
    }
  })
};
module.exports = watchServer;