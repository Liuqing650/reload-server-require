'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var chokidar = require('chokidar');
var invalidate = require('invalidate-module');

function initOptions(opts) {
  var options = {
    chokidar: {
      ignoreInitial: true
    },
    timeout: 20
  };
  try {
    if (opts && (0, _keys2.default)(opts).length > 0) {
      (0, _keys2.default)(opts).forEach(function (key) {
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
  var options = initOptions(opts);
  var watcher = chokidar.watch(dir, options.chokidar);
  var first = true;
  watcher.on('all', function (event, filename) {
    if (callback && typeof callback === 'function') {
      if (options.timeout) {
        setTimeout(function () {
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
  });
};
module.exports = watchServer;
