const data = require('./data.js');

function createStore() {
  return {
    dataStore: data(),
  };
};

module.exports = createStore;
