// craco.config.js
const path = require('path');

module.exports = {
  style: {
    postcss: {
      config: path.resolve(__dirname, 'postcss.config.js'),
    },
  },
};
