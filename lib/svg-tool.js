var generator = require('flexicon-generator');

module.exports = function(options) {
  return generator(options.src, options)
};
