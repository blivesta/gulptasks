var svgpack = require('svgpack');

module.exports = function(options) {
  return svgpack(options.src, options)
};
