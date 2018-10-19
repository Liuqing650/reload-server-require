const data1 = require('./wch1/data.js');
const data2 = require('./wch2/data.js');

function createStore() {
  return {
    watch1Store: data1(),
    watch2Store: data2(),
  };
};

module.exports = createStore;
