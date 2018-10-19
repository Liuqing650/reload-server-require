const path = require('path');
const chokidar = require('chokidar');
const invalidate = require('invalidate-module');

function initOptions(opts) {
  const options = {
    chokidar: {
      ignoreInitial: true,
    },
    timeout: 20
  };
  try {
    if (opts && Object.keys(opts).length > 0) {
      Object.keys(opts).forEach(function(key) {
        if (key !== 'timeout') {
          options.chokidar[key] = opts[key];
        } else {
          options.timeout = opts[key];
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
  return options;
};

function watchServer(dir, opts, callback) {
  const options = initOptions(opts);
  const watcher = chokidar.watch(dir, options.chokidar);
  let first = true;
  watcher.on('all', (event, filename) => {
    if (callback && typeof callback === 'function') {
      if (options.timeout) {
        setTimeout(() => {
          callback(event, filename);
        }, options.timeout);
      } else {
        callback(event, filename);
      }
    }
    if (!first) {
      invalidate(path.resolve(filename));
    }
    first = false;
  })
};
module.exports = watchServer;